import React from "react";
import { IUISchema } from "uiengine/typings";

export const SchemasContext = React.createContext<ISchemasContext>({
  selectedKeys: [],
  setSelectedKey: (key: any, treeNode?: any, type?: string) => {},
  help: "",
  setHelp: (help: string) => {},
  refresh: Date.now(),
  toggleRefresh: () => {},
  showTab: "",
  activeTab: (tab: string) => {},
  savedTime: "",
  setSavedTime: (savedTime: string) => {},
  // for schema replace
  schema: {},
  updateSchema: (schema: IUISchema) => {},
  editingResource: {} as IResourceTreeNode,
  setEditingResource: (editingResource: IResourceTreeNode) => {}
});
