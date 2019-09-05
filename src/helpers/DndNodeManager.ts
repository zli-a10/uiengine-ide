import _ from "lodash";
import { NodeController, UINode } from "uiengine";
import { VersionControl } from "./VersionControl";
import { IUINode, ILayoutSchema, INodeController } from "uiengine/typings";
import { configLayoutWrappers, getActiveUINode } from "./";
import { IDERegister } from "../helpers";

// TO Fix: Can't drag element into it's child
export class DndNodeManager implements IDndNodeManager {
  static instance: IDndNodeManager;
  static getInstance() {
    if (!DndNodeManager.instance) {
      DndNodeManager.instance = new DndNodeManager();
    }
    return DndNodeManager.instance;
  }

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
  versionControl: IVersionControl = VersionControl.getInstance();
  nodeController: INodeController = NodeController.getInstance();

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

    // initial schema
    if (this.versionControl.histories.length === 0) {
      // const activeLayout = this.nodeController.activeLayout;
      const schema = getActiveUINode(true);
      this.versionControl.push(schema);
    }
  }

  private initial() {
    this.sourceNode = {} as IUINode;
    this.sourceIndex = -1;
    this.sourceSchema = {};
    this.sourceChildrenSchema = [];
    this.sourceParent = {} as IUINode;
    this.sourceParentSchema = {};
    this.sourceParentChildrenSchema = [];
    this.targetNode = {} as IUINode;
    this.targetIndex = -1;
    this.targetSchema = {};
    this.targetChildrenSchema = [];
    this.targetParent = {} as IUINode;
    this.targetParentSchema = {};
    this.targetParentChildrenSchema = [];
  }

  pushVersion() {
    const schema = getActiveUINode(true);
    this.versionControl.push(schema);
  }

  private async refresh() {
    // const activeLayout = this.nodeController.activeLayout;
    // const uiNode = this.nodeController.getUINode(activeLayout, true);
    this.pushVersion();

    let targetNode =
      (this.targetParent as UINode) || (this.targetNode as UINode);
    if (targetNode && targetNode.updateLayout) {
      await targetNode.updateLayout();
      targetNode.sendMessage(true); // force refresh
    }

    let sourceNode =
      (this.sourceParent as UINode) || (this.sourceNode as UINode);

    if (sourceNode && sourceNode.updateLayout) {
      // if (!this.inChild(sourceNode, targetNode)) {
      await sourceNode.updateLayout();
      sourceNode.sendMessage(true); // force refresh
      // }
    }

    // singleton, need remove all stored values
    this.initial();
  }

  private removeSourceNode(index?: number) {
    if (index === undefined || index < 0) {
      index = this.sourceIndex;
    }

    // remove from source
    this.sourceParentChildrenSchema.splice(index, 1);

    // remove unneccessary wrappers like dup row/col, nonesense row/col
    // this.cleanLayout(this.sourceNode);
  }

  private async replaceInlineSchema(insertLeft: boolean = true) {
    let sourceNewSchema = this.sourceSchema;
    if (this.targetSchema.component !== this.layoutWrappers.col.component) {
      sourceNewSchema = {
        ...this.layoutWrappers.col,
        children: [this.sourceSchema]
      };
    }

    if (
      this.targetParentSchema.component === this.layoutWrappers.row.component
    ) {
      // has already have a row/col frame, just push
      if (this.targetSchema.component === this.layoutWrappers.col.component) {
        if (insertLeft) {
          this.targetParentChildrenSchema.splice(
            this.targetIndex,
            0,
            sourceNewSchema
          );
        } else {
          this.targetParentChildrenSchema.splice(
            this.targetIndex + 1,
            0,
            sourceNewSchema
          );
        }
      } else {
        this.targetParentSchema.children = [
          sourceNewSchema,
          {
            ...this.layoutWrappers.col,
            children: [this.targetSchema]
          }
        ];
      }

      this.removeSourceNode();
      await this.refresh();
    } else {
      let newSchema = {
        ...this.layoutWrappers.row,
        children: [
          sourceNewSchema,
          {
            ...this.layoutWrappers.col,
            children: [this.targetSchema]
          }
        ]
      };
      await this.replaceSchema(newSchema);
    }
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
    if (removeIndex > -1) this.removeSourceNode(removeIndex);
    await this.refresh();
  }

  private inChild(source: IUINode, target: IUINode) {
    if (source) {
      if (source.children.indexOf(target) > -1) {
        return true;
      } else {
        for (let i in source.children) {
          if (this.inChild(source.children[i], target)) return true;
        }
      }
    }
    return false;
  }

  canDrop(sourceNode: IUINode, targetNode: IUINode) {
    this.selectNode(sourceNode, targetNode);
    if (!this.sourceParent) return true;
    if (!this.targetParent) return false;
    if (this.sourceNode === this.targetNode) return false;

    const result = !this.inChild(sourceNode, targetNode);
    return result;
  }

  canDropInCenter(targetNode: IUINode) {
    const targetComponent = _.get(targetNode, "schema.component");
    const componentInfo = IDERegister.getComponentInfo(targetComponent);
    let result =
      componentInfo.isContainer === undefined || componentInfo.isContainer;
    if (result) {
      // is it a template or children
      const isTemplateOrChildrenTemplate =
        _.get(targetNode, "props.ide_droppable") === undefined;
      return result && isTemplateOrChildrenTemplate;
    }
    return result;
  }

  async insertCenter(sourceNode: IUINode, targetNode: IUINode) {
    // this.selectNode(sourceNode, targetNode);
    if (!this.canDrop(sourceNode, targetNode)) return;

    // it's not a container
    if (!this.canDropInCenter(targetNode)) return;

    // empty target, just push
    // if don't clone, will cause dead loop
    this.targetChildrenSchema.push(_.cloneDeep(this.sourceSchema));
    this.targetSchema.children = this.targetChildrenSchema;
    // remove from source
    this.sourceParentChildrenSchema.splice(this.sourceIndex, 1);

    await this.refresh();
  }

  async insertLeft(sourceNode: IUINode, targetNode: IUINode) {
    // this.selectNode(sourceNode, targetNode);
    if (!this.canDrop(sourceNode, targetNode)) return;

    // build new schema using this.layoutWrappers
    await this.replaceInlineSchema(true);
  }

  async insertRight(sourceNode: IUINode, targetNode: IUINode) {
    // this.selectNode(sourceNode, targetNode);
    if (!this.canDrop(sourceNode, targetNode)) return;

    // build new schema using wrappers
    await this.replaceInlineSchema(false);
  }

  async insertUp(sourceNode: IUINode, targetNode: IUINode) {
    // this.selectNode(sourceNode, targetNode);
    if (!this.canDrop(sourceNode, targetNode)) return;
    await this.replaceSchema(this.sourceSchema, false, true);
  }

  async insertDown(sourceNode: IUINode, targetNode: IUINode) {
    // this.selectNode(sourceNode, targetNode);
    if (!this.canDrop(sourceNode, targetNode)) return;
    await this.replaceSchema(this.sourceSchema, true, true);
  }

  async delete(sourceNode: IUINode) {
    this.selectNode(sourceNode, {} as IUINode);
    this.removeSourceNode();
    await this.refresh();
  }

  async useSchema(targetNode: IUINode, schema: ILayoutSchema) {
    this.selectNode({} as IUINode, targetNode);
    function customizer(objValue: any, srcValue: any) {
      if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    }
    _.mergeWith(this.targetSchema, schema, customizer);
    await this.refresh();
  }

  // clear children
  async cleanLayout(sourceNode: IUINode) {
    this.selectNode(sourceNode, {} as IUINode);
    this.sourceSchema.children = [];
    await this.refresh();
  }

  async removeWrappers(sourceNode: IUINode) {
    if (!sourceNode.parent) return;
    this.selectNode(sourceNode, {} as IUINode);
    const removeAllWrappers = (node: IUINode) => {
      // this.selectNode(sourceNode, {} as IUINode);
      let sourceSchema = node.schema;
      const layoutRowComponent = this.layoutWrappers.row.component;
      const layoutColComponent = this.layoutWrappers.col.component;
      let destSchema: any = [];
      if (
        sourceSchema.component === layoutRowComponent ||
        sourceSchema.component === layoutColComponent
      ) {
        for (let i in node.children) {
          const uiNode = node.children[i];
          destSchema = destSchema.concat(removeAllWrappers(uiNode));
        }
      } else {
        destSchema.push(_.cloneDeep(sourceSchema));
      }
      return destSchema;
    };

    // append to parent
    if (this.sourceParentSchema.children) {
      const schema = removeAllWrappers(sourceNode);
      this.sourceParentChildrenSchema.splice(this.sourceIndex, 1);
      const tailChildren = this.sourceParentChildrenSchema.splice(
        this.sourceIndex,
        this.sourceParentChildrenSchema.length
      );

      this.sourceParentSchema.children = [
        ...this.sourceParentChildrenSchema,
        ...schema,
        ...tailChildren
      ];
      await this.refresh();
    }
  }
}
