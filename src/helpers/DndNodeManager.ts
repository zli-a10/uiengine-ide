import _ from "lodash";
import { NodeController, UINode } from "uiengine";
import { VersionControl } from "./VersionControl";
import { IUINode, IUISchema, INodeController } from "uiengine/typings";
import { configLayoutWrappers, getActiveUINode, IDERegister } from "./";

export class DndNodeManager implements IDndNodeManager {
  static instance: IDndNodeManager;
  static getInstance() {
    if (!DndNodeManager.instance) {
      DndNodeManager.instance = new DndNodeManager();
    }
    if (IDERegister.layoutComponentWrapper) {
      DndNodeManager.instance.layoutWrappers =
        IDERegister.layoutComponentWrapper;
    }
    return DndNodeManager.instance;
  }

  sourceNode?: IUINode;
  sourceIndex: number = -1;
  sourceSchema: IUISchema = {};
  sourceChildrenSchema: Array<IUISchema> = [];
  sourceParent?: IUINode;
  sourceParentSchema: IUISchema = {};
  sourceParentChildrenSchema: Array<IUISchema> = [];

  targetNode?: IUINode;
  targetIndex: number = -1;
  targetSchema: IUISchema = {};
  targetChildrenSchema: Array<IUISchema> = [];
  targetParent?: IUINode;
  targetParentSchema: IUISchema = {};
  targetParentChildrenSchema: Array<IUISchema> = [];

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
        if (this.sourceParent.children) {
          this.sourceIndex = this.sourceParent.children.indexOf(sourceNode);
        }
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
        if (this.targetParent.children) {
          this.targetIndex = this.targetParent.children.indexOf(targetNode);
        }
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
    if (targetNode && targetNode.refreshLayout) {
      await targetNode.refreshLayout();
      targetNode.sendMessage(true); // force refresh
    }

    let sourceNode =
      (this.sourceParent as UINode) || (this.sourceNode as UINode);

    if (sourceNode && sourceNode.refreshLayout) {
      // if (!this.inChild(sourceNode, targetNode)) {
      await sourceNode.refreshLayout();
      sourceNode.sendMessage(true); // force refresh
      // }
    }
    // global refresh, otherwise the $template & $Children can't be refreshed
    // const rootNode = getActiveUINode() as IUINode;
    // await rootNode.refreshLayout();
    // rootNode.sendMessage(true); // force refresh
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
    if (sourceNewSchema.component !== this.layoutWrappers.col.component) {
      sourceNewSchema = {
        ...this.layoutWrappers.col,
        children: [_.cloneDeep(this.sourceSchema)]
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
            children: [_.cloneDeep(this.targetSchema)]
          }
        ];
      }
      let removeIndex = this.sourceIndex;
      if (this.targetParent === this.sourceParent) {
        removeIndex = this.sourceIndex + 1;
      }
      this.removeSourceNode(removeIndex);
      await this.refresh();
    } else {
      let newSchema;
      if (insertLeft) {
        newSchema = {
          ...this.layoutWrappers.row,
          children: [
            sourceNewSchema,
            {
              ...this.layoutWrappers.col,
              children: [_.cloneDeep(this.targetSchema)]
            }
          ]
        };
      } else {
        newSchema = {
          ...this.layoutWrappers.row,
          children: [
            {
              ...this.layoutWrappers.col,
              children: [_.cloneDeep(this.targetSchema)]
            },
            sourceNewSchema
          ]
        };
      }
      await this.replaceSchema(newSchema);
    }
  }

  private async replaceSchema(
    newSchema: IUISchema,
    insertBottom: boolean = false,
    verticalSwitch: boolean = false
  ) {
    let removeIndex = this.sourceIndex;
    // left or right drag
    let insertPos = this.targetIndex;
    if (insertBottom) {
      ++insertPos;
    }
    let clonedSchema = _.cloneDeep(newSchema);
    if (verticalSwitch) {
      this.targetParentChildrenSchema.splice(insertPos, 0, clonedSchema);
      // target index larger than source index, the length added one;
      if (
        this.sourceParent === this.targetParent &&
        this.sourceIndex > this.targetIndex
      ) {
        removeIndex++;
      }
    } else {
      this.targetParentChildrenSchema[insertPos] = clonedSchema;
    }
    if (removeIndex > -1) this.removeSourceNode(removeIndex);
    await this.refresh();
  }

  private inChild(source: IUINode, target: IUINode) {
    if (source) {
      if (source.children && source.children.indexOf(target) > -1) {
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

  async useSchema(
    targetNode: IUINode,
    schema: IUISchema,
    replacePath?: string
  ) {
    this.selectNode({} as IUINode, targetNode);
    function customizer(objValue: any, srcValue: any) {
      if (_.isArray(objValue) && _.isArray(srcValue)) {
        return _.union(objValue, srcValue);
        // return objValue.concat(srcValue);
      } else if (_.isEmpty(srcValue)) {
        return srcValue;
      }
    }
    if (replacePath) {
      // for (let key in schema) {
      //   if (_.get(this.targetSchema, key)) {
      //     delete this.targetSchema[key];
      //   }
      // }
      // _.merge(this.targetSchema, schema);
      _.set(this.targetSchema, replacePath, _.get(schema, replacePath, undefined))
    } else {
      _.mergeWith(this.targetSchema, schema, customizer);
    }
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
      // const schema = removeAllWrappers(sourceNode);
      this.sourceParentChildrenSchema.splice(this.sourceIndex, 1);
      const tailChildren = this.sourceParentChildrenSchema.splice(
        this.sourceIndex,
        this.sourceParentChildrenSchema.length
      );
      if (sourceNode.schema.children && sourceNode.schema.children.length) {
        this.sourceParentSchema.children = [
          ...this.sourceParentChildrenSchema,
          ...sourceNode.schema.children,
          ...tailChildren
        ];
      } else {
        this.sourceParentSchema.children = [
          ...this.sourceParentChildrenSchema,
          // ...schema,
          ...tailChildren
        ];
      }
      await this.refresh();
    }
  }
}
