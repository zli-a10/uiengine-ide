interface IGlobalContext {
  ideMode: boolean;
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
  resourceTree: IResourceTreeObjects;
  setResourceTree: (resourceTree: any, type?: EResourceType) => any;
  fileStatus: { [type: string]: { [file: string]: EFullStatus } };
  setFileStatus: (status: IFileStatusGroup) => any;
}

interface ISchemasContext {
  selectedKeys;
  setSelectedKey: (key: any, treeNode?: any, type?: string) => any;
  savedTime: string;
  setSavedTime: (savedTime: string) => any;
  help: string;
  setHelp: (help: string) => any;
  refresh: number;
  toggleRefresh: () => any;
  showTab: string;
  activeTab: (tab: string) => any;
  schema: ILayoutSchema;
  updateSchema: (schema: ILayoutSchema) => any;
  //data sourcely
  editingResource: IResourceTreeNode;
  setEditingResource: (editingResource: IResourceTreeNode) => any;
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

interface IContentList {
  file: string;
  type: string;
  content: string;
}
interface IIDEEditorContext {
  showTab: string;
  tabs: Array<{ tab: string; language: string; treeNode?: IResourceTreeNode }>;
  activeTab: (tab: string, language?: string, oldTabName?: string) => any;
  removeTab: (tab: string) => any;
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
  content: Array<IContentList>;
  setContent: (content: IContentList) => any;
}

interface IPropsContext {
  showTab: string;
  activeTab: (tab: string) => any;
  help: string;
  setHelp: (help: string) => any;
  time: number;
  refresh: () => any;
}

// interface IDataSourceContext {
//   dataSource: any;
// }
