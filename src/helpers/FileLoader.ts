import _ from "lodash";
import { StorageAdapter } from "./StorageAdapter";

export class FileLoader implements IFileLoader {
  static storageType: string = "Local";
  static instance: IFileLoader;
  static getInstance() {
    if (!FileLoader.instance) {
      FileLoader.instance = new FileLoader();
    }
    return FileLoader.instance;
  }
  storage: IStorage;

  private trees = {
    schema: {},
    plugins: {}
  };

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

  saveTree(treeRoot: IFileTree, type: string) {
    const clearNodes = this.clearTree(treeRoot);
    this.storage.save(`file_tree.${type}`, JSON.stringify(clearNodes));
  }

  saveFile(
    path: string,
    content: any,
    type: string,
    treeRoot?: IFileTree
  ): boolean {
    console.log("saving ...", path);
    // store tree
    if (this.isTempStorage() && treeRoot) {
      this.saveTree(treeRoot, type);
    }

    this.storage.save(`${type}/${path}`, JSON.stringify(content));
    return true;
  }

  loadFileTree(type: string = "schema"): IFileTree {
    const fileTreeJson = this.storage.get(`file_tree.${type}`);
    // console.log(fileTreeJson);
    if (fileTreeJson) {
      return JSON.parse(fileTreeJson);
    } else {
      return {
        name: "root",
        title: "Root Node",
        children: []
      };
    }
  }

  loadFile(path: string, type?: string) {
    console.log(path, type, "on fileloader");
    const content = this.storage.get(`${type}/${path}`);
    if (type === "schema") {
      if (content) {
        return JSON.parse(content);
      } else {
        return {};
      }
    }
    return content;
  }

  removeFile(path: string, type?: string, treeRoot?: IFileTree): boolean {
    if (type === "schema") {
      if (this.isTempStorage() && treeRoot) {
        this.saveTree(treeRoot, type);
      }
    }
    return this.storage.remove(`${type}/${path}`);
  }
}
