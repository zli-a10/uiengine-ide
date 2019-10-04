import _ from "lodash";
import { StorageAdapter } from "./StorageAdapter";
import * as commands from "./websocket";

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

  private clearTree(treeRoot: IFileTree) {
    let root = treeRoot;
    const newNode = {} as IFileTree;
    _.forIn(root, (value: any, key: any) => {
      if (key[0] !== "_") {
        newNode[key] = value;
      }
    });

    if (root.children && root.children.length) {
      root.children.forEach((node: IFileTree, i: number) => {
        root.children[i] = this.clearTree(node);
      });
    }
    return newNode;
  }

  saveTree(treeRoot: IFileTree, type: EResourceType) {
    const clearNodes = this.clearTree(treeRoot);
    this.storage.save(`file_tree.${type}`, JSON.stringify(clearNodes.children));
  }

  saveFile(
    path: string,
    content: any,
    type: EResourceType,
    treeRoot?: IFileTree
  ): boolean {
    console.log("saving ...", path);
    // store tree
    if (this.isTempStorage() && treeRoot) {
      this.saveTree(treeRoot, type);
    }

    if (type === "schema" || type === "datasource") {
      content = JSON.stringify(content);
    }

    this.storage.save(`${type}/${path}`, content);
    return true;
  }

  loadFileTree(type: EResourceType = "schema", isTemplate?: boolean) {
    const promise = new Promise((resolve: any) => {
      if (!isTemplate) {
        const fileTreeJson = this.storage.get(`file_tree.${type}`);
        let result: any = [];
        if (fileTreeJson) {
          try {
            result = JSON.parse(fileTreeJson);
          } catch (e) {
            result = [];
          }
        }
        const promise = commands.getFileList(type, isTemplate);
        promise.then((tree: any) => {
          result = _.unionBy(result, tree, "name");
          // cache to local storage
          this.storage.save(`file_tree.${type}`, JSON.stringify(result));
          resolve(result);
        });
      } else {
        const promise = commands.getFileList(type, isTemplate);
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
        try {
          content = JSON.parse(content);
        } catch {
          content = [];
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

  removeFile(path: string, type?: string, treeRoot?: IFileTree): boolean {
    if (type === "schema" || type === "datasource") {
      if (this.isTempStorage() && treeRoot) {
        this.saveTree(treeRoot, type);
      }
    }
    return this.storage.remove(`${type}/${path}`);
  }
}
