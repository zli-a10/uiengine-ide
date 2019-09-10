import React, { useState } from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

export const Section = (props: any) => {
  const { children, title, active } = props;
  const [activeKey, setActiveKey] = useState(active ? "1" : "2");
  const callback = (key: any) => {
    setActiveKey(key);
  };

  return (
    <div style={{ marginBottom: "6px" }}>
      <Collapse defaultActiveKey="2" activeKey={activeKey} onChange={callback}>
        <Panel header={title} key="1">
          {children}
        </Panel>
      </Collapse>
    </div>
  );
};
