import React from "react";
import { ILayoutSchema } from "uiengine/typings";

export const SchemasContext = React.createContext<ISchemasContext>({
  currentData: {},
  setCurrentData: (dataRef: any) => {},
  selectedKeys: [],
  setSelectedKey: (key: any) => {},
  help: "",
  setHelp: (help: string) => {},
  refresh: "",
  toggleRefresh: (refresh: string) => {},
  showTab: "",
  activeTab: (tab: string) => {},
  savedTime: "",
  setSavedTime: (savedTime: string) => {},
  // for schema replace
  schema: {},
  updateSchema: (schema: ILayoutSchema) => {}
});