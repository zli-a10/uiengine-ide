export class SesssionStorage implements IStorage {
  static type: string = "local"; // remote file or session or local storage
  static instance: IStorage;
  static getInstance() {
    if (!SesssionStorage.instance) {
      SesssionStorage.instance = new SesssionStorage();
    }
    return SesssionStorage.instance;
  }

  private storage = window.sessionStorage;

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
