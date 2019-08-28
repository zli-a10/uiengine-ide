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
  dataSourceProps: {},
  toggleCollapsed: (propsCollapsed: boolean) => {},
  focusMode: { isFocus: false, topSchema: {} },
  updateFocusMode: false
});
