import React, { useContext, useState, useMemo, useEffect } from "react";
import _ from "lodash";
import { Tabs, Icon } from "antd";
import Draggable from "react-draggable";
// import { Resizable } from "re-resizable";
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

  const onMouseDown = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setActiveKey(defaultActiveKey);
  }, [preview]);

  // const [size, setSize] = useState({ width: 300, height: 500 });
  // const resize = (e: any, direction: any, ref: any, d: any) => {
  //   setSize({
  //     width: size.width + d.width,
  //     height: size.height + d.height
  //   });
  // };

  return !propsCollapsed ? (
    <Draggable onMouseDown={onMouseDown} cancel=".ant-tabs-content">
      {/* <Resizable
        defaultSize={{
          width: 320,
          height: 200
        }}
        size={size}
        onResizeStop={resize}
      > */}
      <div className={`props showout`} id="prop-manager">
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
          {preview ? null : (
            <TabPane tab="Design" key="1">
              <Props />
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
      {/* </Resizable> */}
    </Draggable>
  ) : null;
};
