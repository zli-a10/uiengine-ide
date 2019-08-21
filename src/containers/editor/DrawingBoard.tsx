import React, { useState, useEffect } from "react";
// import { Tabs, Icon } from 'antd';
// import { LayoutManager } from "./LayoutManager";
import _ from "lodash";
import { UIEngine } from "uiengine";
import { UIEngineDndProvider, UIEngineDndWrapper } from "../dnd";
import VersionControl from "../dnd/VersionControl";

export const DrawingBoard: React.FC = (props: any) => {
  // const [layout, setLayout] = useState("startup");
  const { layouts, config = {} } = props;
  _.set(config, `widgetConfig.componentWrapper`, UIEngineDndWrapper);
  _.set(config, `widgetConfig.uiengineWrapper`, UIEngineDndProvider);
  // config.widgetConfig = {componentWrapper
  // console.log(UIEngineRegister.componentsLibrary);
  const historyAction = async (e: any) => {
    console.log(e, "was pressed");
    const versionControl = VersionControl.getInstance();
    if (e.ctrlKey && e.code === "KeyZ") {
      console.log("control z pressed");
      await versionControl.undo();
    }

    if (e.ctrlKey && e.code === "KeyR") {
      console.log("control r pressed");
      await versionControl.redo();
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    document.body.onkeypress = historyAction;
  });
  return (
    <div className="editor">
      {/* <LayoutManager layout={layout} /> */}
      <UIEngine layouts={layouts} config={config} />
    </div>
  );
};
