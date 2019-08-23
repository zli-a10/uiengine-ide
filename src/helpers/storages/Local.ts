export class LocalStorage implements IStorage {
  static type: string = "local"; // remote file or session or local storage
  static instance: IStorage;
  static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  private storage = window.localStorage;

  save(path: string, content: string) {
    this.storage[path] = content;
  }

  remove(path: string) {
    this.storage.removeItem(path);
  }

  get(path: string) {
    return this.storage[path];
  }
}
