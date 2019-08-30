import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useContext
} from "react";

import * as _ from "lodash";
import { Icon, Switch, Tabs } from "antd";
import { Manager, PropManager, DrawingBoard } from "./";
import { Context } from "./Context";
// import { useVisibilites } from '../hooks/visibility';
import { UIEngineDndProvider } from "../dnd";
import { CodeEditor } from "./CodeEditor";
const { TabPane } = Tabs;
import { getActiveUINode } from "../../helpers";

import "./styles/index.less";
// import "animate.css";

import { ILayoutSchema } from "uiengine/typings";
import { UINode } from "uiengine";

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

  const { manangerProps } = props;
  const [preview, setPreview] = useState(false);
  const [theme, setTheme] = useState("default");
  const [info, setInfo] = useState({});
  const [focusMode, updateFocusMode] = useState({} as any);
  const contextValue = useMemo<IIDEContext>(
    () => ({
      preview,
      togglePreview: async () => {
        await switchPreview();
      },
      info,
      updateInfo: (schema: ILayoutSchema) => {
        const myInfo = Object.assign({}, info, schema);
        setInfo(myInfo);
      },
      theme: "default",
      toggleTheme: (theme: string) => {
        setTheme(theme);
      },
      propsCollapsed,
      toggleCollapsed: (propsCollapsed: boolean) => {
        setPropsCollapse(propsCollapsed);
      },
      dataSourceProps: manangerProps,
      focusMode,
      updateFocusMode
    }),
    [preview, theme, info, propsCollapsed, focusMode]
  );
  const switchPreview = async () => {
    const rootNode = getActiveUINode() as UINode;
    await rootNode.updateLayout();
    rootNode.sendMessage(true);
    setPreview(!preview);
  };

  // short cut
  useEffect(() => {
    const element = document.getElementById("drawingboard");
    if (element)
      element.ondblclick = e => {
        e.stopPropagation();
        setPropsCollapse(!propsCollapsed);
      };
  });

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
          <Context.Consumer>
            {({ info: { currentPath } }) => (
              <>
                <a
                  className="button-menu"
                  onClick={() => setComponentCollapse(!componentsCollapsed)}
                >
                  <Icon type="menu" /> Editing {currentPath}
                </a>
                {sessionStorage.savedTime ? (
                  <div className="page-name">
                    <em>(Last Saved: {sessionStorage.savedTime})</em>
                  </div>
                ) : null}
              </>
            )}
          </Context.Consumer>
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
            <a className="save">
              <Icon type="save" />
            </a>
          </div>
          <div className="brand">GUI IDE</div>
        </div>
      </div>

      <UIEngineDndProvider>
        <div className={headerCollapsed ? "ide-editor show-max" : "ide-editor"}>
          {componentsCollapsed ? null : (
            <Manager
              onClose={() => setComponentCollapse(!componentsCollapsed)}
            />
          )}

          <Tabs defaultActiveKey="1">
            <TabPane tab="Drawing Board" key="1">
              <DrawingBoard {...props} />
            </TabPane>
            <TabPane tab="Code Editor" key="2">
              <CodeEditor />
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
