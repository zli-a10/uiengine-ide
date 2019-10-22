import _ from "lodash";
import { StorageAdapter } from "./StorageAdapter";
import * as commands from "./websocket";
import { saveFileStatus, loadFileStatus, cleanSchema } from "./utils";

export class FileLoader implements IFileLoader {
  static storageType: EStorageType = "Local";
  static instance: IFileLoader;
  static getInstance() {
    if (!FileLoader.instance) {
      FileLoader.instance = new FileLoader();
    }
    return FileLoader.instance;
  }
  storage: IStorage;
  editingFile: string = "";

  constructor() {
    StorageAdapter.type = FileLoader.storageType;
    this.storage = StorageAdapter.getInstance();
  }

  private isTempStorage() {
    return (
      FileLoader.storageType === "Local" || FileLoader.storageType === "Session"
    );
  }

  private clearTree(treeRoot: IResourceTreeNode, folderOnly: boolean = false) {
    let root = treeRoot;
    const newNode = {} as IResourceTreeNode;
    if (folderOnly && root.nodeType !== "folder") {
      return newNode;
    }
    _.forIn(root, (value: any, key: any) => {
      if (key[0] !== "_") {
        newNode[key] = value;
      }
    });

    if (root.children && root.children.length) {
      root.children.forEach((node: IResourceTreeNode, i: number) => {
        if (root.children) root.children[i] = this.clearTree(node);
      });
    }
    return newNode;
  }

  saveTree(treeRoot: any, type: EResourceType) {
    let nodes: any;
    if (_.isArray(treeRoot)) {
      nodes = treeRoot.map((data: any) => {
        return this.clearTree(data);
      });
    } else {
      nodes = this.clearTree(treeRoot);
      nodes = _.get(nodes, "children");
    }
    this.storage.save(`file_tree.${type}`, JSON.stringify(nodes));
  }

  saveFile(
    path: string,
    content: any,
    type: EResourceType,
    treeRoot?: IResourceTreeNode
  ): boolean {
    console.log("saving ...", path);
    // store tree
    if (this.isTempStorage() && treeRoot) {
      this.saveTree(treeRoot, type);
    }

    if (type === "schema" || type === "datasource") {
      if (_.isString(content)) {
        try {
          content = JSON.parse(content);
        } catch {
          console.log("type %s parsed error", type);
        }
      }
      content = cleanSchema(content, true);
      content = JSON.stringify(content, null, "\t");
    }

    this.storage.save(`${type}/${path}`, content);

    // save file status
    const statusObj = loadFileStatus(type, path);
    // const list = ["new", "renamed", "removed"];
    saveFileStatus(path, type, {
      status: _.get(statusObj, "status", "changed"),
      nodeType: "file"
    });
    return true;
  }

  loadFileTree(
    type: EResourceType = "schema",
    isTemplate: boolean = false,
    remoteOnly: boolean = false,
    folderOnly: boolean = false
  ) {
    const promise = new Promise((resolve: any) => {
      if (!isTemplate) {
        let result: any = [];

        if (!remoteOnly) {
          const fileTreeJson = this.storage.get(`file_tree.${type}`);
          if (fileTreeJson) {
            try {
              result = JSON.parse(fileTreeJson);
              if (folderOnly) {
                result = this.clearTree(result, folderOnly);
              }
            } catch (e) {
              result = [];
            }
          }
        }
        const promise = commands.getFileList(type, isTemplate, folderOnly);
        promise.then((tree: any) => {
          result = _.unionBy(result, tree, "name");
          // cache to local storage
          if (!folderOnly) {
            this.storage.save(`file_tree.${type}`, JSON.stringify(result));
          }
          resolve(result);
        });
      } else {
        const promise = commands.getFileList(type, isTemplate, folderOnly);
        promise.then((tree: any) => {
          if (tree) {
            resolve(tree);
          } else {
            resolve([]);
          }
        });
      }
    });
    return promise;
  }

  loadFile(path: string, type: EResourceType = "schema", isTemplate?: boolean) {
    const newPromise = new Promise((resolve: any) => {
      let content = this.storage.get(`${type}/${path}`);
      if (content) {
        if (type === "schema" || type === "datasource") {
          try {
            content = JSON.parse(content);
          } catch {
            content = [];
          }
        }
        resolve(content);
      } else {
        const promise = commands.readFile(type, path, isTemplate);
        promise.then((data: any) => {
          if (
            (type === "schema" || type === "datasource") &&
            _.isString(data)
          ) {
            try {
              data = JSON.parse(data);
            } catch (e) {
              console.warn(e);
            }
          }
          resolve(data);
        });
      }
    });

    return newPromise;
  }

  private removeTreeNode(treeRoot: any, path: string) {
    if (treeRoot.name === path) return treeRoot;
    if (!_.isEmpty(treeRoot.children)) {
      treeRoot.children.forEach((node: IResourceTreeNode, index: number) => {
        if (node.name === path) {
          treeRoot.children.splice(index, 1);
        } else if (!_.isEmpty(node.children)) {
          this.removeTreeNode(node, path);
        }
      });
    }
  }

  removeFile(
    path: string,
    type: EResourceType = "schema",
    treeRoot?: IResourceTreeNode
  ): boolean {
    if (type === "schema" || type === "datasource") {
      if (this.isTempStorage()) {
        if (!treeRoot) {
          let treeRootString = this.storage.get(`file_tree.${type}`);
          if (treeRootString) treeRoot = JSON.parse(treeRootString);
        }

        let tree: any = treeRoot;
        if (_.isArray(treeRoot)) {
          tree = { children: treeRoot };
        }

        if (tree) {
          this.removeTreeNode(tree, path);
          this.saveTree(tree, type);
        }
      }
    }
    return this.storage.remove(`${type}/${path}`);
  }
}
