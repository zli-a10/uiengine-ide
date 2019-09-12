import React, { useContext, useState, useMemo, useEffect } from "react";
import _ from "lodash";
import { Tabs, Icon } from "antd";
import Draggable from "react-draggable";
import { Debugger } from "./Debugger";
import { Release, Props } from "../PropManager";
import { GlobalContext, IDEEditorContext } from "../../Context";

const TabPane = Tabs.TabPane;
export const PropManager: React.FC<IPropManager> = props => {
  // const { onClose } = props;
  const { preview, propsCollapsed, togglePropsCollapsed } = useContext(
    GlobalContext
  );
  const { editNode } = useContext(IDEEditorContext);
  let defaultActiveKey = preview ? "2" : "1";
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  useEffect(() => {
    setActiveKey(defaultActiveKey);
  }, [preview]);

  const onMouseDown = (e: any) => {
    e.stopPropagation();
  };

  const [animatedClassName, setAnimatedClassName] = useState("showout");
  useEffect(() => {
    setAnimatedClassName("showout");
    _.debounce(() => {
      setAnimatedClassName("");
    }, 1200)();
  }, [editNode]);

  return !propsCollapsed ? (
    <Draggable onMouseDown={onMouseDown} cancel=".ant-tabs-content">
      <div className={`props ${animatedClassName}`} id="prop-manager">
        <h3 className="prop-title">
          {_.get(
            editNode,
            "schema.datasource.source",
            _.get(editNode, "schema.datasource")
          )}
          <a
            className="close-button"
            onClick={() => {
              togglePropsCollapsed(true);
              setAnimatedClassName("");
            }}
          >
            <Icon type="close" />
          </a>
        </h3>

        <Tabs
          defaultActiveKey={defaultActiveKey}
          activeKey={activeKey}
          onChange={setActiveKey}
        >
          {!editNode ? null : (
            <TabPane tab="Design" key="1">
              <Props {...props} />
            </TabPane>
          )}
          <TabPane tab="Debug" key="2">
            <Debugger />
          </TabPane>
          <TabPane tab="Release" key="3">
            <Release />
          </TabPane>
        </Tabs>
      </div>
    </Draggable>
  ) : null;
};
