import React from "react";
import { any } from "prop-types";

export const GlobalContext = React.createContext<IGlobalContext>({
  ideMode: true,
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
  toggleComponentCollapsed: (collapsed: boolean) => {},
  resourceTree: {
    handler: [],
    datasource: [],
    plugin: [],
    component: [],
    schema: []
  },
  setResourceTree: (resourceTree: any, type?: EResourceType) => {},
  fileStatus: {},
  setFileStatus: (status: IFileStatusGroup) => {}
});
