import _ from "lodash";
import { IUINode, ILayoutSchema } from "uiengine/typings";

const configLayoutWrappers: IConfigWrappers = {
  row: {
    component: "div",
    props: {
      className: "ide-wrapper-row"
    }
  },
  col: {
    component: "div",
    props: {
      className: "ide-wrapper-col"
    }
  }
};

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

  layoutWrappers: IConfigWrappers = configLayoutWrappers;

  private selectNode(sourceNode: IUINode, targetNode: IUINode) {
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

  private async refresh() {
    if (!this.sourceParent || !this.targetParent) return;
    await this.sourceParent.updateLayout();
    this.sourceParent.sendMessage(true); // force refresh
    await this.targetParent.updateLayout();
    this.targetParent.sendMessage(true); // force refresh}
  }

  private removeSourceNode(index?: number) {
    if (index === undefined || index < 0) {
      index = this.sourceIndex;
    }

    // remove from source
    this.sourceParentChildrenSchema.splice(index, 1);

    // TO FIX: remove the col if no elements inside
    // console.log(this.sourceChildrenSchema);
    // // remove col
    // if (!this.sourceParentChildrenSchema.length) {
    //   console.log(
    //     "this.sourceParentChildrenSchema",
    //     this.sourceParentChildrenSchema
    //   );
    //   // parent is wrapper component?
    //   const parentComponent = _.get(this.sourceParentSchema, "component");
    //   const layoutWrappersColComponent = _.get(
    //     this.layoutWrappers,
    //     "col.component"
    //   );
    //   // const layoutWrappersRowComponent = _.get(this.layoutWrappers, 'row.component');
    //   if (parentComponent === layoutWrappersColComponent && this.sourceParent) {
    //     console.log(" it is the right element to remove");
    //     // if only one element in row,
    //     const parentSchemaChildren = _.get(
    //       this.sourceParent,
    //       "parent.schema.children",
    //       []
    //     );
    //     if (this.sourceParent.parent && parentSchemaChildren.length) {
    //       const parentIndex = this.sourceParent.parent.children.indexOf(
    //         this.sourceParent.parent
    //       );
    //       console.log("remove index", parentIndex);

    //       parentSchemaChildren.splice(parentIndex, 1);
    //     }
    //   }
    // }
  }

  private async replaceSchema(
    newSchema: ILayoutSchema,
    insertBottom: boolean = false,
    verticalSwitch: boolean = false
  ) {
    let removeIndex = this.sourceIndex;
    // left or right drag
    let insertPos = this.targetIndex;
    if (insertBottom) {
      ++insertPos;
    }
    if (verticalSwitch) {
      this.targetParentChildrenSchema.splice(insertPos, 0, newSchema);
      // target index larger than source index, the length added one;
      if (
        this.sourceParent === this.targetParent &&
        this.sourceIndex > this.targetIndex
      ) {
        removeIndex++;
      }
    } else {
      this.targetParentChildrenSchema[insertPos] = newSchema;
    }
    this.removeSourceNode(removeIndex);
    await this.refresh();
  }

  async insertCenter(sourceNode: IUINode, targetNode: IUINode) {
    this.selectNode(sourceNode, targetNode);
    if (!this.sourceParent || !this.targetParent) return;
    if (sourceNode === targetNode) return;

    // empty target, just push
    this.targetChildrenSchema.push(this.sourceSchema);
    this.targetSchema.children = this.targetChildrenSchema;
    // remove from source
    this.sourceParentChildrenSchema.splice(this.sourceIndex, 1);
    await this.refresh();
  }

  async insertLeft(sourceNode: IUINode, targetNode: IUINode) {
    this.selectNode(sourceNode, targetNode);

    if (!this.sourceParent || !this.targetParent) return;

    // if dragging at itself, remove the source
    if (sourceNode === targetNode) return;

    // build new schema using this.layoutWrappers
    const newSchema = {
      ...this.layoutWrappers.row,
      children: [
        {
          ...this.layoutWrappers.col,
          children: [this.sourceSchema]
        },
        {
          ...this.layoutWrappers.col,
          children: [this.targetSchema]
        }
      ]
    };
    await this.replaceSchema(newSchema);
  }

  async insertRight(sourceNode: IUINode, targetNode: IUINode) {
    this.selectNode(sourceNode, targetNode);
    if (!this.sourceParent || !this.targetParent) return;
    // if dragging at itself, remove the source
    if (sourceNode === targetNode) return;

    // build new schema using wrappers
    const newSchema = {
      ...this.layoutWrappers.row,
      children: [
        {
          ...this.layoutWrappers.col,
          children: [this.targetSchema]
        },
        {
          ...this.layoutWrappers.col,
          children: [this.sourceSchema]
        }
      ]
    };
    this.targetParentChildrenSchema.splice(this.targetIndex, 1);
    await this.replaceSchema(newSchema);
  }

  async insertTop(sourceNode: IUINode, targetNode: IUINode) {
    this.selectNode(sourceNode, targetNode);
    await this.replaceSchema(this.sourceSchema, false, true);
  }

  async insertBottom(sourceNode: IUINode, targetNode: IUINode) {
    this.selectNode(sourceNode, targetNode);
    await this.replaceSchema(this.sourceSchema, true, true);
  }
}
