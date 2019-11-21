import React, { useState, useContext, useCallback } from "react";
import { Tabs } from "antd";
import _ from "lodash";
import { GlobalContext } from "uiengine-ide";

const { TabPane } = Tabs;

const TabListComponent = (props: any) => {
  const { ideMode, preview } = useContext(GlobalContext);
  const {
    children,
    uinode,
    value,
    titleDataSource,
    titleMaxLength,
    maxTabs
  } = props;

  const [activeKey, setActiveKey] = useState("0");
  const onEdit = useCallback(
    (targetKey: any, action: any) => {
      if (maxTabs && parseInt(maxTabs) < children.length) {
        return false;
      }
      if (action === "add") {
        uinode.dataNode.createRow();
        const key = children.length ? children.length : 0;
        setActiveKey(key.toString());
      } else if (action === "remove" && children.length > 1) {
        uinode.dataNode.deleteData(targetKey);
        const key = children.length ? children.length - 2 : 0;
        setActiveKey(key.toString());
      }
    },
    [uinode, children, activeKey]
  );

  const onChange = useCallback((activeKey: string) => {
    setActiveKey(activeKey);
  }, []);

  return (
    <div className="a10-tab-list">
      <Tabs
        type="editable-card"
        onEdit={onEdit}
        onChange={onChange}
        activeKey={activeKey}
        defaultActiveKey={activeKey}
      >
        {ideMode && !preview ? (
          <TabPane tab={"Tab Editing"} key="0">
            {children}
          </TabPane>
        ) : children && _.isArray(children) ? (
          children.map((child: any, index: number) => {
            let title = "Tab1";
            if (titleDataSource) {
              const titlePath = titleDataSource.replace("$", index);
              // title = uinode.dataNode.dataPool.get(titlePath) || title;
              title = _.get(value, titlePath, "Tab1");
              if (titleMaxLength && title.length > titleMaxLength) {
                title = title.substr(0, titleMaxLength) + "...";
              }
            }
            return (
              <TabPane tab={title} key={index.toString()}>
                {child}
              </TabPane>
            );
          })
        ) : (
          <TabPane tab={"Tab New"} key="0">
            <div>Empty</div>
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default TabListComponent;
