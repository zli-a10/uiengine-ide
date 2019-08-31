import React from "react";

export const GlobalContext = React.createContext<IGlobalContext>({
  preview: false,
  togglePreview: (preview: boolean) => {},
  saved: false,
  theme: "",
  toggleTheme: (theme: string) => {},
  propsCollapsed: false,
  togglePropsCollapsed: (collapsed: boolean) => {},
  headerCollapsed: false,
  toggleHeaderCollapsed: (collapsed: boolean) => {},
  componentCollapsed: false,
  toggleComponentCollapsed: (collapsed: boolean) => {}
});
