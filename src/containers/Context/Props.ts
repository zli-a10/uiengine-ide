import React from "react";

export const PropsContext = React.createContext<IPropsContext>({
  showTab: "",
  activeTab: (tab: string) => {},
  help: "",
  setHelp: (help: string) => {},
  refresh: "",
  toggleRefresh: (refresh: string) => {}
});
