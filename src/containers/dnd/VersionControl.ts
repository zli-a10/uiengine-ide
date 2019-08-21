import { ILayoutSchema } from "uiengine/typings";

export default class VersionControl implements IVersionControl {
  histories: Array<IHistory> = [];

  push(schema: ILayoutSchema) {
    this.histories.push(schema);
  }

  pop() {
    this.histories.push();
  }
}
