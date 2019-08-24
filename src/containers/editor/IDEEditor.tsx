import React, { useCallback, useState, useMemo, useEffect } from "react";

import * as _ from "lodash";
import { Icon, Switch, Tabs } from "antd";
import { Manager, PropManager, DrawingBoard } from "./";
import { Context } from "./Context";
// import { useVisibilites } from '../hooks/visibility';
import { UIEngineDndProvider } from "../dnd";
const { TabPane } = Tabs;

import "./styles/index.less";
// import "animate.css";

import { ILayoutSchema } from "uiengine/typings";

export const IDEEditor: React.FC<IIDEEditor> = props => {
  const [componentsCollapsed, setComponentCollapse] = useState(false);
  const [propsCollapsed, setPropsCollapse] = useState(true);
  const [headerCollapsed, setHeaderCollapse] = useState(false);

  const hideAll = useCallback(() => {
    setComponentCollapse(true);
    setPropsCollapse(true);
    setHeaderCollapse(true);
  }, [componentsCollapsed, propsCollapsed, headerCollapsed]);

  const showAll = useCallback(() => {
    setComponentCollapse(false);
    setHeaderCollapse(false);
  }, [componentsCollapsed, propsCollapsed, headerCollapsed]);

  const [preview, setPreview] = useState(false);
  const [theme, setTheme] = useState("default");
  const [info, setInfo] = useState({});
  const contextValue = useMemo<IIDEContext>(
    () => ({
      preview,
      togglePreview: (preview: boolean) => {
        setPreview(preview);
      },
      info,
      updateInfo: (schema: ILayoutSchema) => {
        const myInfo = Object.assign({}, info, schema);
        setInfo(myInfo);
      },
      theme: "default",
      toggleTheme: (theme: string) => {
        setTheme(theme);
      }
    }),
    [preview, theme, info]
  );
  const switchPreview = () => {
    setPreview(!preview);
  };

  const {
    manangerProps: { getDataSource, expandDataSource } = {} as any
  } = props;

  return (
    <Context.Provider value={contextValue}>
      {headerCollapsed ? (
        <a className="ide-show" onClick={showAll}>
          <Icon type="caret-right" />
        </a>
      ) : null}
      <div className={headerCollapsed ? "ide-header hide" : "ide-header"}>
        <div className="left">
          <div className="button-close">
            <Icon type="close" onClick={hideAll} />
          </div>
          <a
            className="button-menu"
            onClick={() => setComponentCollapse(!componentsCollapsed)}
          >
            <Icon type="menu" /> Editing WAF - Template{" "}
          </a>
          <div className="page-name">
            <em>(last saved: 10:09)</em>
          </div>
        </div>
        <div className="right">
          <div className="props">
            <Switch
              checked={preview}
              checkedChildren="Preview"
              unCheckedChildren="Edit"
              onChange={switchPreview}
            />
            <a
              className="settings"
              onClick={() => setPropsCollapse(!propsCollapsed)}
            >
              <Icon type="setting" />
            </a>
            <div className="editor">
              <Icon type="edit" />
            </div>
          </div>
          <div className="brand">GUI IDE</div>
        </div>
      </div>

      <UIEngineDndProvider>
        <div className="ide-editor">
          {componentsCollapsed ? null : (
            <Manager
              getDataSource={getDataSource}
              expandDataSource={expandDataSource}
              onClose={() => setComponentCollapse(!componentsCollapsed)}
            />
          )}

          <Tabs defaultActiveKey="1">
            <TabPane tab="Drawing Board" key="1">
              <DrawingBoard {...props} />
            </TabPane>
            <TabPane tab="Code Editor" key="2">
              {/* <CodeEditor /> */}
            </TabPane>
          </Tabs>
          {propsCollapsed ? null : (
            <PropManager onClose={() => setPropsCollapse(!propsCollapsed)} />
          )}
        </div>
      </UIEngineDndProvider>
    </Context.Provider>
  );
};
