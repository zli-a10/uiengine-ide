import React from "react";
import { ILayoutSchema } from "uiengine/typings";

export const SchemasContext = React.createContext<ISchemasContext>({
  currentData: {},
  setCurrentData: (dataRef: any) => {},
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
  updateSchema: (schema: ILayoutSchema) => {},
  editingResource: {} as IResourceTreeNode,
  setEditingResource: (editingResource: IResourceTreeNode) => {}
});
