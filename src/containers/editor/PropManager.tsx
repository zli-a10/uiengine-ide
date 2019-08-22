import React, { useContext } from "react";
import { Tabs, Icon } from "antd";
import Draggable from "react-draggable";
import { Debugger } from "./Debugger";
import { Props } from "./Props";
import { Context } from "../editor/Context";

const TabPane = Tabs.TabPane;

export const PropManager: React.FC<IPropManager> = props => {
  const { onClose } = props;
  const { preview } = useContext(Context);
  let defaultActiveKey = preview ? "2" : "1";
  return (
    <Draggable>
      <div className="props">
        <a className="close-button" onClick={onClose}>
          <Icon type="close" />
        </a>

        <Tabs defaultActiveKey={defaultActiveKey}>
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
