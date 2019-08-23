import * as storages from "./storages";

export class StorageAdapter implements IStorage {
  static type: string = "Local"; // remote File or Session or Local storage
  static instance: IStorage;
  static getInstance() {
    if (!StorageAdapter.instance) {
      StorageAdapter.instance = new StorageAdapter();
    }
    return StorageAdapter.instance;
  }

  private storage: IStorage = storages[StorageAdapter.type].getInstance();
  path: string = "";
  content: string = "";

  private setInfo(path: string, content?: string) {
    if (path) this.path = path;
    if (content) this.path = content;
  }

  save(path: string, content: string) {
    this.setInfo(path, content);
    this.storage.save(this.path, this.content);
  }

  remove(path: string) {
    this.setInfo(path);
    this.storage.remove(this.path);
  }

  get(path: string) {
    this.setInfo(path);
    this.storage.get(this.path);
  }
}
