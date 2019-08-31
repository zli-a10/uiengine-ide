import React from "react";
import { ILayoutSchema } from "uiengine/typings";

export const SchemasContext = React.createContext<ISchemasContext>({
  current: "",
  setCurrent: (path: string) => {},
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
