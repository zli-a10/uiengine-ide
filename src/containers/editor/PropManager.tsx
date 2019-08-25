import React, { useContext, useState } from "react";
import { Tabs, Icon } from "antd";
import Draggable from "react-draggable";
import { Debugger } from "./Debugger";
import { Props } from "./Props";
import { Context } from "../editor/Context";
import "./styles/PropManager.less";
const TabPane = Tabs.TabPane;

export const PropManager: React.FC<IPropManager> = props => {
  const { onClose } = props;
  const { preview } = useContext(Context);
  let defaultActiveKey = preview ? "2" : "1";
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  return (
    <Draggable>
      <div className="props" id="prop-manager">
        <a className="close-button" onClick={onClose}>
          <Icon type="close" />
        </a>

        <Tabs
          defaultActiveKey={defaultActiveKey}
          activeKey={activeKey}
          onChange={setActiveKey}
        >
          <TabPane tab="Props" key="1">
            <Props />
          </TabPane>
          <TabPane tab="Debug" key="2">
            <Debugger />
          </TabPane>
        </Tabs>
      </div>
    </Draggable>
  );
};
