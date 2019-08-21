import _ from "lodash";
// import { difference } from "../../utils";
import { ILayoutSchema, INodeController, IUINode } from "uiengine/typings";
import { NodeController } from "uiengine";

export default class VersionControl implements IVersionControl {
  static instance: IVersionControl;
  static getInstance() {
    if (!VersionControl.instance) {
      VersionControl.instance = new VersionControl();
    }
    return VersionControl.instance;
  }

  histories: Array<IHistory> = [];
  position: number = -1;
  nodeController: INodeController = NodeController.getInstance();

  private async reloadSchema(schema: ILayoutSchema) {
    const activeLayout = this.nodeController.activeLayout;
    const uiNode: IUINode = this.nodeController.getUINode(activeLayout, true);
    await uiNode.replaceLayout(schema);
    await uiNode.sendMessage(true);
  }

  push(schema: ILayoutSchema) {
    // TO FIX: use diff to save history
    // if (this.histories.length > 0) {
    //   schema = difference(schema, this.histories[0].schema);
    // }
    const history: IHistory = {
      version: _.uniqueId(),
      schema: _.cloneDeep(schema)
    };
    this.histories.push(history);
    this.position = this.histories.length - 1;
  }

  async redo() {
    if (this.histories.length === 0) return;
    if (this.position === this.histories.length - 1) return;
    this.position++;
    if (this.histories[this.position]) {
      const schema = this.histories[this.position].schema;
      await this.reloadSchema(schema);
    }
  }

  async undo() {
    if (this.histories.length === 0) return;
    if (this.position === 0) return;
    this.position--;
    if (this.histories[this.position]) {
      const schema = this.histories[this.position].schema;
      await this.reloadSchema(schema);
    }
  }
}
