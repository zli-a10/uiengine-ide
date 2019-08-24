export class SesssionStorage implements IStorage {
  static instance: IStorage;
  static getInstance() {
    if (!SesssionStorage.instance) {
      SesssionStorage.instance = new SesssionStorage();
    }
    return SesssionStorage.instance;
  }

  private storage = window.sessionStorage;

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
