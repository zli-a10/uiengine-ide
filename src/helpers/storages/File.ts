export class FileStorage implements IStorage {
  static type: string = "local"; // remote file or session or local storage
  static instance: IStorage;
  static getInstance() {
    if (!FileStorage.instance) {
      FileStorage.instance = new FileStorage();
    }
    return FileStorage.instance;
  }

  path: string = "";
  content: string = "";

  save(path: string, content: string) {}

  remove(path: string) {}

  get(path: string) {}
}
