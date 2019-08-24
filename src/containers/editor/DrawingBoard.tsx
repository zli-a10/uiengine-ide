import React, { useState, useEffect, useContext } from "react";
// import { Tabs, Icon } from 'antd';
// import { LayoutManager } from "./LayoutManager";
import _ from "lodash";
import { UIEngine } from "uiengine";
import { UIEngineDndWrapper } from "../dnd";
import VersionControl from "../dnd/VersionControl";
import { Context } from "../editor/Context";
// import { FileLoader } from "../../helpers";

// const fileLoader = FileLoader.getInstance();
export const DrawingBoard: React.FC = (props: any) => {
  const { info, updateInfo } = useContext(Context);
  const { layouts, config = {} } = props;
  let schemas = layouts;

  _.set(config, `widgetConfig.componentWrapper`, UIEngineDndWrapper);
  // _.set(config, `widgetConfig.uiengineWrapper`, UIEngineDndProvider);
  const historyAction = async (e: any) => {
    e.stopPropagation();
    const versionControl = VersionControl.getInstance();
    if (e.ctrlKey && e.code === "KeyZ") {
      const schema = await versionControl.undo();
      updateInfo({ schema });
    }

    if (e.ctrlKey && e.shiftKey && e.code === "KeyZ") {
      const schema = await versionControl.redo();
      updateInfo({ schema });
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    document.body.onkeypress = historyAction;
  });
  // console.log(schemas, info);
  return (
    <div className="editor">
      {/* <LayoutManager layout={layout} /> */}
      <UIEngine layouts={schemas} config={config} />
    </div>
  );
};
