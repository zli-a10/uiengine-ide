interface IConfigWrappers {
  row: any;
  col: any;
}

interface IHistory {
  version: string;
  schema: ILayoutSchema;
}

interface IVersionControl {
  histories: Array<IHistory>;
  push(schema: ILayoutSchema);
  redo();
  undo();
}

interface DragItem {
  uinode?: IUINode;
  type: string;
  schema?: ILayoutSchema;
}

interface IDndNodeManager {
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

  canDrop(sourceNode: IUINode, targetNode: IUINode);
  insertCenter(sourceNode: IUINode, targetNode: IUINode);

  insertLeft(
    sourceNode: IUINode,
    targetNode: IUINode,
    wrappers?: IConfigWrappers
  );

  insertRight(
    sourceNode: IUINode,
    targetNode: IUINode,
    wrappers?: IConfigWrappers
  );

  insertTop(sourceNode: IUINode, targetNode: IUINode);

  insertBottom(sourceNode: IUINode, targetNode: IUINode);

  delete(sourceNode: IUINode);
  useSchema(targetNode: IUINode, schema: ILayoutSchema);
  cleanLayout(sourceNode: IUINode);
  removeWrappers(sourceNode: IUINode);
}

// component schema for libraries
interface IComponentInfo {
  id: string; // component name generally
  title: string; //"Widgets",
  schema: ILayoutSchema;
  url?: string;
  library?: string;
  version?: string;
  preview?: string; //'xx.png'
  icon?: string;
}

interface IComponentInfoGroup {
  id: string;
  children: Array<IComponentInfo>;
  version?: string;
  title?: string;
}

interface ICommandOutput {
  status: number;
  output: any;
}
