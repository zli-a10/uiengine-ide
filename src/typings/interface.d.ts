declare module "*.json" {
  const value: any;
  export default value;
}

interface IIDEEditor {
  children?: ReactNode;
  layouts: [string];
  config: object;
}

interface IPropManager {
  onClose: () => any;
}

interface IManager {
  onClose: () => any;
}

interface IWidgets {
  widgets: IWidget[];
}

interface ILayoutManager {
  layout: string;
}

interface ITree {
  tree: any;
}

interface ITreeState {
  expandKeys: string[];
  date: number;
}

interface IComponents {
  list: any;
}

interface IWidget {
  widget: any;
}

interface IMenuTitle {
  dataRef: any;
}

interface IIDEContext {
  preview: boolean;
}

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
  uinode: IUINode;
  type: string;
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
  cleanLayout(sourceNode: IUINode);
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

interface IFileLoader {
  storage: IStorage;
  loadFileTree();
  loadFile(path: string);
  removeFile(path: string);
  updateFile(path: string, content: string);
}

interface IStorage {
  save(path: string, content: string);
  remove(path: string);
  get(path: string);
}
