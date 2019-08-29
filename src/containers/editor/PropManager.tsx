import React, { useContext, useState, useMemo } from "react";
import _ from "lodash";
import { Tabs, Icon } from "antd";
import Draggable from "react-draggable";
import { Debugger } from "./Debugger";
import { Release } from "./Release";
import { Props } from "./Props";
import { Context } from "../editor/Context";

const TabPane = Tabs.TabPane;
export const PropManager: React.FC<IPropManager> = props => {
  const { onClose } = props;
  const {
    preview,
    info: { editNode }
  } = useContext(Context);
  let defaultActiveKey = preview ? "2" : "1";
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  let [animatedClass, setAnimatedClass] = useState("showout");

  _.debounce(() => {
    setAnimatedClass("");
  }, 1000)();

  const onMouseDown = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Draggable onMouseDown={onMouseDown}>
      <div className={`props ${animatedClass}`} id="prop-manager">
        <h3 className="prop-title">
          {_.get(
            editNode,
            "schema.datasource.source",
            _.get(editNode, "schema.datasource")
          )}
          <a className="close-button" onClick={onClose}>
            <Icon type="close" />
          </a>
        </h3>

        <Tabs
          defaultActiveKey={defaultActiveKey}
          activeKey={activeKey}
          onChange={setActiveKey}
        >
          <TabPane tab="Design" key="1">
            <Props />
          </TabPane>
          <TabPane tab="Debug" key="2">
            <Debugger />
          </TabPane>
          <TabPane tab="Release" key="3">
            <Release />
          </TabPane>
        </Tabs>
      </div>
    </Draggable>
  );
};
