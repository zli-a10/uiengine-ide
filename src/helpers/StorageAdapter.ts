import _ from "lodash";
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

  private storage: IStorage;
  path: string = "";
  content: string = "";
  constructor() {
    // console.log(storages, StorageAdapter.type);
    const storageName = `${_.upperFirst(StorageAdapter.type)}Storage`;
    this.storage = storages[storageName].getInstance();
  }

  private setInfo(path: string, content?: string) {
    if (path) this.path = path;
    if (content) this.content = content;
  }

  save(path: string, content: any) {
    this.setInfo(path, content);
    return this.storage.save(this.path, this.content);
  }

  remove(path: string) {
    this.setInfo(path);
    return this.storage.remove(this.path);
  }

  get(path: string) {
    this.setInfo(path);
    return this.storage.get(this.path);
  }
}
