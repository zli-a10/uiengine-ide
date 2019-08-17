declare module "*.json" {
  const value: any;
  export default value;
}

interface IIDEEditor {
  children?: ReactNode;
  layouts: string;
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
