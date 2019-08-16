import React, { useState } from "react";
// import { Tabs, Icon } from 'antd';
import { LayoutManager } from "./LayoutManager";

export const DrawingBoard: React.FC = (props: any) => {
  const [layout, setLayout] = useState("startup");

  return (
    <div className="editor">
      <LayoutManager layout={layout} />
    </div>
  );
};
