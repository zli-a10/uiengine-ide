import React, { useState } from "react";
// import { Tabs, Icon } from 'antd';
// import { LayoutManager } from "./LayoutManager";
import { UIEngine, UIEngineRegister } from "uiengine";

export const DrawingBoard: React.FC = (props: any) => {
  // const [layout, setLayout] = useState("startup");
  const { layouts, config } = props;
  console.log(UIEngineRegister.componentsLibrary);
  return (
    <div className="editor">
      {/* <LayoutManager layout={layout} /> */}
      <UIEngine layouts={layouts} config={config} />
    </div>
  );
};
