interface IErrorBoundaryProps {}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface IPropInfo {
  schema?: ILayoutSchema;
  debug?: any;
  [name: string]: any;
}

interface IIDEEditor {
  children?: ReactNode;
  layouts: [string];
  config: object;
  datasource: {
    getDataSource?: () => any;
    expandDataSource?: (uiPath: string) => any;
  };
}

interface IPropManager {}

interface IDesignManager {
  datasource: any;
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
  autoExpandParent: boolean;
  [name: string]: any;
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

type EEditingType = "add" | "edit" | "clone" | "rename" | boolean;
type EStatus = "changed" | "new" | "removed";
interface IResourceTreeNode {
  name: string;
  title: string;
  children: Array<IResourceTreeNode>;
  _path_: string;
  _key_: string;
  _parent_: IResourceTreeNode;
  _status_?: EStatus;
  _editing_: EEditingType;
}
