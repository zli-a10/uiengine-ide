import React, { useState } from "react";
// import { Tabs, Icon } from 'antd';
// import { LayoutManager } from "./LayoutManager";
import _ from "lodash";
import { UIEngine, UIEngineRegister } from "uiengine";
import { UIEngineDndProvider, UIEngineDndWrapper } from "../dnd";

export const DrawingBoard: React.FC = (props: any) => {
  // const [layout, setLayout] = useState("startup");
  const { layouts, config = {} } = props;
  _.set(config, `widgetConfig.componentWrapper`, UIEngineDndWrapper);
  _.set(config, `widgetConfig.uiengineWrapper`, UIEngineDndProvider);
  // config.widgetConfig = {componentWrapper
  // console.log(UIEngineRegister.componentsLibrary);
  return (
    <div className="editor">
      {/* <LayoutManager layout={layout} /> */}
      <UIEngine layouts={layouts} config={config} />
    </div>
  );
};
