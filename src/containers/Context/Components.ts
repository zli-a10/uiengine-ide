import React from "react";

export const ComponentsContext = React.createContext<IComponentsContext>({
  keywords: "",
  setKeywords: (path: string) => {},
  help: "",
  setHelp: (help: string) => {},
  refresh: "",
  toggleRefresh: (refresh: string) => {},
  showTab: "",
  activeTab: (tab: string) => {}
});
