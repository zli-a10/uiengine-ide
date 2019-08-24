export class FileStorage implements IStorage {
  static instance: IStorage;
  static getInstance() {
    if (!FileStorage.instance) {
      FileStorage.instance = new FileStorage();
    }
    return FileStorage.instance;
  }

  path: string = "";
  content: string = "";

  save(path: string, content: any) {}

  remove(path: string) {}

  get(path: string) {}
}
