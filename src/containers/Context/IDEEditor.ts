import React from "react";
import { IUINode } from "uiengine/typings";

export const IDEEditorContext = React.createContext<IIDEEditorContext>({
  showTab: "",
  activeTab: (tab: string) => {},
  layout: "",
  setLayout: (path: string) => {},
  focusMode: { isFocus: false, topSchema: {} },
  updateFocusMode: false,
  help: "",
  setHelp: (help: string) => {},
  refresh: "",
  toggleRefresh: (refresh: string) => {},
  editNode: {} as IUINode,
  chooseEditNode: (editNode: IUINode) => {}
});
