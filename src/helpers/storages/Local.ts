export class LocalStorage implements IStorage {
  static instance: IStorage;
  static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  private storage = window.localStorage;

  save(path: string, content: any) {
    this.storage[path] = content;
  }

  remove(path: string) {
    this.storage.removeItem(path);
  }

  get(path: string) {
    return this.storage[path];
  }
}
