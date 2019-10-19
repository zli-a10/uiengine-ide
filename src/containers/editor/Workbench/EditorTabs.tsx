import React, { useState, useCallback, useEffect, useContext } from "react";
import * as _ from "lodash";
import { Tabs, Icon, Row, Col, Menu, Dropdown } from "antd";
import { DrawingBoard, CodeEditor } from "./../";
import { IDEEditorContext } from "../../Context";
const { TabPane } = Tabs;

const WindowSizeDown = (props: any) => {
  const { onSplitWindow, onMenuClick, onSave } = props;

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="12:12">1:1</Menu.Item>
      <Menu.Item key="8:16">1:2</Menu.Item>
      <Menu.Item key="6:18">1:3</Menu.Item>
      <Menu.Item key="16:8">2:1</Menu.Item>
      <Menu.Item key="18:6">3:1</Menu.Item>
    </Menu>
  );

  return (
    <div className="tab-action">
      <Icon
        type="save"
        style={{ marginRight: "20px" }}
        onClick={onSave}
        className="splitter"
      />
      <Dropdown overlay={menu}>
        <Icon
          type="layout"
          style={{ marginRight: "20px" }}
          onClick={onSplitWindow}
          className="splitter"
        />
      </Dropdown>
    </div>
  );
};

export const EditorTabs = (props: any) => {
  const { activeKey, tabs } = props;
  const { activeTab, removeTab, content } = useContext(IDEEditorContext);
  const [leftSpan, setLeftSpan] = useState(12);
  const [rightSpan, setRightSpan] = useState(12);

  // split window
  const [splitted, setSpitted] = useState(false);
  const onSplitWindow = useCallback(() => {
    setSpitted(!splitted);
    if (!splitted) {
      localStorage["drawingBoardLayout"] = "12:12";
    } else {
      localStorage["drawingBoardLayout"] = "";
    }
  }, [splitted]);

  const onMenuClick = useCallback((e: any) => {
    const { key } = e;
    const [left, right] = key.split(":");
    setLeftSpan(left);
    setRightSpan(right);
    setSpitted(true);
    localStorage["drawingBoardLayout"] = key;
  }, []);

  const [saved, setSaved] = useState(true);
  const onSave = useCallback(() => {
    setSaved(true);
  }, [splitted]);

  const onEdit = useCallback(
    (targetKey: any, action: string) => {
      if (action === "remove") {
        removeTab(targetKey);
      }
    },
    [removeTab, tabs]
  );

  const [data, setData] = useState({});
  const onChange = useCallback(
    (activeKey: any) => {
      activeTab(activeKey);
      // search content
      const tabContent = _.find(content, {
        file: activeKey
      });
      if (tabContent) setData(tabContent);
    },
    [activeTab]
  );

  useEffect(() => {
    if (localStorage["drawingBoardLayout"]) {
      onMenuClick({ key: localStorage["drawingBoardLayout"] });
    }
    if (tabs.length) {
      setSpitted(!!localStorage["drawingBoardLayout"]);
    } else {
      setSpitted(false);
    }
    onChange(activeKey);
  }, [activeKey, tabs]);

  return !splitted ? (
    <Tabs
      defaultActiveKey="drawingboard"
      activeKey={activeKey}
      onChange={onChange}
      hideAdd
      type="editable-card"
      onEdit={onEdit}
      tabBarExtraContent={
        tabs && tabs.length ? (
          <WindowSizeDown
            saved={saved}
            onMenuClick={onMenuClick}
            onSplitWindow={onSplitWindow}
            onSave={onSave}
          />
        ) : null
      }
    >
      <TabPane tab="Drawing Board" key="drawingboard">
        <DrawingBoard {...props} />
      </TabPane>

      {tabs.map((tab: any) => (
        <TabPane tab={tab.tab} key={tab.tab}>
          <CodeEditor data={data} />
        </TabPane>
      ))}
    </Tabs>
  ) : (
    <Row>
      <Col span={leftSpan}>
        <Tabs defaultActiveKey="drawingboard">
          <TabPane tab="Drawing Board" key="drawingboard">
            <DrawingBoard {...props} />
          </TabPane>
        </Tabs>
      </Col>
      <Col span={rightSpan}>
        <Tabs
          onEdit={onEdit}
          hideAdd
          type="editable-card"
          defaultActiveKey={activeKey}
          tabBarExtraContent={
            tabs && tabs.length ? (
              <WindowSizeDown
                onMenuClick={onMenuClick}
                onSplitWindow={onSplitWindow}
                onSave={onSave}
              />
            ) : null
          }
        >
          {tabs.map((tab: any) => (
            <TabPane tab={tab.tab} key={tab.tab}>
              <CodeEditor data={data} />
            </TabPane>
          ))}
        </Tabs>
      </Col>
    </Row>
  );
};
