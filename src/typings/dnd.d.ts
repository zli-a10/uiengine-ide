interface IIDEContext {
  preview: boolean;
}

interface IIDEEditor {
  children?: ReactNode;
  layouts: [string];
  config: object;
  manangerProps: {
    getDataSource?: () => any;
    expandDataSource?: (uiPath: string) => any;
  };
}

interface IPropManager {
  onClose: () => any;
}

interface IManager {
  onClose: () => any;
  getDataSource?: () => any;
  expandDataSource?: (uiPath: string) => any;
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
