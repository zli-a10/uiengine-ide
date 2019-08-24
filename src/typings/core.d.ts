interface ICommand {
  type: string;
  to: string; // target
  content: any;
}

interface IFileTree {
  name: string;
  title: string;
  children: Array<IFileTree>;
}

interface IFileLoader {
  storage: IStorage;
  editingFile: string;
  saveTree(treeRoot: IFileTree, type: string);
  saveFile(
    path: string,
    content: any,
    type: string,
    treeRoot?: IFileTree
  ): boolean;
  loadFileTree(type: string): IFileTree;
  loadFile(path: string, type?: string): any;
  removeFile(path: string, type?: string): boolean;
}

interface IStorage {
  save(path: string, content: any);
  remove(path: string);
  get(path: string);
}
