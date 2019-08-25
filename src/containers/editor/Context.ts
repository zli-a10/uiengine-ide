import React from "react";
import { ILayoutSchema } from "uiengine/typings";

export const Context = React.createContext<IIDEContext>({
  preview: false,
  togglePreview: () => {},
  info: {},
  updateInfo: () => {},
  theme: "default",
  toggleTheme: () => {},
  propsCollapsed: true,
  toggleCollapsed: (propsCollapsed: boolean) => {}
});
