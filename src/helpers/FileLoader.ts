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

  constructor() {
    StorageAdapter.type = FileLoader.storageType;
    this.storage = StorageAdapter.getInstance();
  }

  loadFileTree() {}

  loadFile(path: string) {}

  removeFile(path: string) {}

  updateFile(path: string, content: string) {}
}
