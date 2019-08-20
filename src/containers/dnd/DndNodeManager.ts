import _ from "lodash";
import { IUINode, ILayoutSchema } from "uiengine/typings";

export default class DnDNodeManager implements IDndNodeManager {
  sourceNode?: IUINode;
  sourceIndex: number = -1;
  sourceSchema: ILayoutSchema = {};
  sourceChildrenSchema: Array<ILayoutSchema> = [];
  sourceParent?: IUINode;
  sourceParentSchema: ILayoutSchema = {};
  sourceParentChildrenSchema: Array<ILayoutSchema> = [];

  targetNode?: IUINode;
  targetIndex: number = -1;
  targetSchema: ILayoutSchema = {};
  targetChildrenSchema: Array<ILayoutSchema> = [];
  targetParent?: IUINode;
  targetParentSchema: ILayoutSchema = {};
  targetParentChildrenSchema: Array<ILayoutSchema> = [];

  selectNode(sourceNode: IUINode, targetNode: IUINode) {
    // handle source node
    if (sourceNode) {
      this.sourceNode = sourceNode;
      this.sourceSchema = sourceNode.schema;
      this.sourceChildrenSchema = _.get(this.sourceSchema, "children", []);
      this.sourceParent = sourceNode.parent;
      if (this.sourceParent) {
        this.sourceIndex = this.sourceParent.children.indexOf(sourceNode);
        this.sourceParentSchema = this.sourceParent.schema;
        this.sourceParentChildrenSchema = _.get(
          this.sourceParentSchema,
          "children",
          []
        );
      } else {
        this.sourceIndex = -1;
        this.sourceParentSchema = {};
        this.sourceParentChildrenSchema = [];
      }
    } else {
      this.sourceNode = undefined;
      this.sourceSchema = {};
      this.sourceChildrenSchema = [];
      this.sourceParent = undefined;
    }

    // handle target node
    if (targetNode) {
      this.targetNode = targetNode;
      this.targetSchema = targetNode.schema;
      this.targetChildrenSchema = _.get(this.targetSchema, "children", []);
      this.targetParent = targetNode.parent;
      if (this.targetParent) {
        this.targetIndex = this.targetParent.children.indexOf(targetNode);
        this.targetParentSchema = this.targetParent.schema;
        this.targetParentChildrenSchema = _.get(
          this.targetParentSchema,
          "children",
          []
        );
      } else {
        this.targetIndex = -1;
        this.targetParentSchema = {};
        this.targetParentChildrenSchema = [];
      }
    } else {
      this.targetNode = undefined;
      this.targetSchema = {};
      this.targetChildrenSchema = [];
      this.targetParent = undefined;
    }
  }

  async insert() {
    if (!this.sourceParent || !this.targetParent) return;

    if (!this.targetParentChildrenSchema.length) {
      // empty target, just push
      this.targetParentChildrenSchema.push(this.sourceSchema);
      this.targetParentSchema.children = this.targetParentChildrenSchema;
    } else {
      // if dragging at itself, remove the source
      if (this.targetParent === this.sourceParent) {
        this.targetParentChildrenSchema.splice(this.sourceIndex, 1);
      } else {
        // remove from source
        this.sourceParentChildrenSchema.splice(this.sourceIndex, 1);
        await this.sourceParent.updateLayout();
        this.sourceParent.sendMessage(true); // force refresh
      }
      // console.log(this.sourceIndex, this.sourceIndex);
      this.targetParentChildrenSchema.splice(
        this.targetIndex,
        0,
        this.sourceSchema
      );
    }
    await this.targetParent.updateLayout();
    this.targetParent.sendMessage(true); // force refresh}
  }

  pushDown() {}

  pushUp() {}

  pushRight() {}

  pushLeft() {}
}
