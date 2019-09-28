import React, { useState, useMemo, useCallback, useEffect } from "react";
import * as _ from "lodash";
import { Tabs, Icon, Row, Col, Menu, Dropdown } from "antd";
import { IUINode } from "uiengine/typings";
import { Main, DesignManager, PropManager, DrawingBoard, CodeEditor } from "./";
import { IDEEditorContext } from "../Context";
import { UIEngineDndProvider } from "../dnd";
const { TabPane } = Tabs;
import * as Providers from "./Providers";
import { IDE_ID } from "../../helpers";
import "./styles/index.less";
import ErrorBoundary from "./ErrorBoundary";

const WindowSizeDown = (props: any) => {
  const { onSplitWindow, onMenuClick } = props;

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
    <Dropdown overlay={menu}>
      <Icon
        type="layout"
        style={{ marginRight: "20px" }}
        onClick={onSplitWindow}
      />
    </Dropdown>
  );
};

export const IDEEditor: React.FC<IIDEEditor> = props => {
  const [editNode, setEditNode] = useState();
  const [content, setContent] = useState();
  const [collapsedNodes, setCollapsedNodes] = useState<Array<string>>([]);

  const ideEditorContextValue = useMemo<IIDEEditorContext>(
    () => ({
      showTab: "",
      activeTab: (tab: string) => {},
      layout: "",
      setLayout: (path: string) => {},
      focusMode: { isFocus: false, topSchema: {} },
      updateFocusMode: false,
      help: "",
      setHelp: (help: string) => {},
      refresh: "",
      toggleRefresh: (refresh: string) => {},
      editNode,
      chooseEditNode: (editNode?: IUINode) => {
        setEditNode(editNode);
      },
      collapsedNodes,
      setCollapsedNode: (uiNode: IUINode) => {
        let id = _.get(uiNode.schema, IDE_ID, _.uniqueId(IDE_ID));
        const index = collapsedNodes.indexOf(id);

        if (index === -1) {
          _.set(uiNode.schema, IDE_ID, id);
          collapsedNodes.push(id);
        } else {
          _.unset(uiNode.schema, IDE_ID);
          collapsedNodes.splice(index, 1);
        }
        // console.log("collapsedNodes", collapsedNodes);
        setCollapsedNodes(_.clone(collapsedNodes));
      },
      content,
      setContent: (content: any) => {
        if (_.isObject(content)) {
          content = JSON.stringify(content, null, "\t");
        }
        setContent(content);
      }
    }),
    [editNode, collapsedNodes, content]
  );

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

  const [leftSpan, setLeftSpan] = useState(12);
  const [rightSpan, setRightSpan] = useState(12);
  const onMenuClick = useCallback((e: any) => {
    const { key } = e;
    const [left, right] = key.split(":");
    setLeftSpan(left);
    setRightSpan(right);
    setSpitted(true);
    localStorage["drawingBoardLayout"] = key;
  }, []);

  useEffect(() => {
    if (localStorage["drawingBoardLayout"]) {
      onMenuClick({ key: localStorage["drawingBoardLayout"] });
    }
    setSpitted(!!localStorage["drawingBoardLayout"]);
  }, [localStorage["drawingBoardLayout"]]);

  return (
    <ErrorBoundary>
      <IDEEditorContext.Provider value={ideEditorContextValue}>
        <UIEngineDndProvider>
          <Providers.Schemas>
            {/*
            <Providers.Props>
              <Providers.Components> */}
            <Main datasource={props.datasource}>
              <div className="ide-editor">
                <DesignManager datasource={props.datasource} />
                {!splitted ? (
                  <Tabs
                    defaultActiveKey="1"
                    tabBarExtraContent={
                      <WindowSizeDown
                        onMenuClick={onMenuClick}
                        onSplitWindow={onSplitWindow}
                      />
                    }
                  >
                    <TabPane tab="Drawing Board" key="1">
                      <DrawingBoard {...props} />
                    </TabPane>
                    <TabPane tab="Code Editor" key="2">
                      <CodeEditor />
                    </TabPane>
                  </Tabs>
                ) : (
                  <Row>
                    <Col span={leftSpan}>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="Drawing Board" key="1">
                          <DrawingBoard {...props} />
                        </TabPane>
                      </Tabs>
                    </Col>
                    <Col span={rightSpan}>
                      <Tabs
                        defaultActiveKey="1"
                        tabBarExtraContent={
                          <WindowSizeDown
                            onMenuClick={onMenuClick}
                            onSplitWindow={onSplitWindow}
                          />
                        }
                      >
                        <TabPane tab="Code Editor" key="1">
                          <CodeEditor />
                        </TabPane>
                      </Tabs>
                    </Col>
                  </Row>
                )}
                <PropManager {...props} />
              </div>
            </Main>
            {/* </Providers.Components>
            </Providers.Props>
          </Providers.Schemas> */}
          </Providers.Schemas>
        </UIEngineDndProvider>
      </IDEEditorContext.Provider>
    </ErrorBoundary>
  );
};
