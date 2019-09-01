interface IGlobalContext {
  preview: boolean;
  togglePreview: (preview: boolean) => any;
  saved: boolean;
  theme: string;
  toggleTheme: (theme: string) => any;
  propsCollapsed: boolean;
  togglePropsCollapsed: (collapsed: boolean) => any;
  headerCollapsed: boolean;
  toggleHeaderCollapsed: (collapsed: boolean) => any;
  componentCollapsed: boolean;
  toggleComponentCollapsed: (collapsed: boolean) => any;
  datasource: any;
}

interface ISchemasContext {
  current: string;
  setCurrent: (path: string) => any;
  savedTime: string;
  setSavedTime: (savedTime: string) => any;
  help: string;
  setHelp: (help: string) => any;
  refresh: string;
  toggleRefresh: (refresh: string) => any;
  showTab: string;
  activeTab: (tab: string) => any;
  schema: ILayoutSchema;
  updateSchema: (schema: ILayoutSchema) => any;
  //data sourcely
}

interface IComponentsContext {
  keywords: string;
  setKeywords: (path: string) => any;
  help: string;
  setHelp: (help: string) => any;
  refresh: string;
  toggleRefresh: (refresh: string) => any;
  showTab: string;
  activeTab: (tab: string) => any;
}

interface IIDEEditorContext {
  showTab: string;
  activeTab: (tab: string) => any;
  layout: string;
  setLayout: (path: string) => any;
  focusMode: { isFocus: false; topSchema: {} };
  updateFocusMode: false;
  help: string;
  setHelp: (help: string) => any;
  refresh: string;
  toggleRefresh: (refresh: string) => any;
  editNode: IUINode;
  chooseEditNode: (editNode: IUINode) => any;
  collapsedNodes: Array<string>;
  setCollapsedNode: (uiNode: IUINode) => any;
}

interface IPropsContext {
  showTab: string;
  activeTab: (tab: string) => any;
  help: string;
  setHelp: (help: string) => any;
  refresh: string;
  toggleRefresh: (refresh: string) => any;
}

// interface IDataSourceContext {
//   dataSource: any;
// }
