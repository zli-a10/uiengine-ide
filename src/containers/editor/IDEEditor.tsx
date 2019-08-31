import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useContext
} from "react";

import * as _ from "lodash";
import { Tabs } from "antd";
import {
  Header,
  DesignManager,
  PropManager,
  DrawingBoard,
  CodeEditor
} from "./";
import { IDEEditorContext } from "../Context";
// import { useVisibilites } from '../hooks/visibility';
import { UIEngineDndProvider } from "../dnd";
// import { CodeEditor } from "./CodeEditor";
const { TabPane } = Tabs;
// import { getActiveUINode } from "../../helpers";

import "./styles/index.less";
// import "animate.css";

// import { ILayoutSchema } from "uiengine/typings";
import { IUINode } from "uiengine/typings";

export const IDEEditor: React.FC<IIDEEditor> = props => {
  // const { preview, togglePreview } = useContext(Context.GlobalContext);
  // const [componentsCollapsed, setComponentCollapse] = useState(
  //   localStorage.ideComponentCollapse === "true"
  // );
  // const [propsCollapsed, setPropsCollapse] = useState(
  //   localStorage.idePropsCollapse === "true"
  // );
  // const [headerCollapsed, setHeaderCollapse] = useState(
  //   localStorage.ideHeaderCollapse === "true"
  // );

  // const toggleComponentCollapse = useCallback((status: boolean) => {
  //   setComponentCollapse(status);
  //   localStorage.ideComponentCollapse = status;
  // }, []);

  // const togglePropsCollapse = useCallback((status: boolean) => {
  //   setPropsCollapse(status);
  //   localStorage.idePropsCollapse = status;
  // }, []);

  // const toggleHeaderCollapse = useCallback((status: boolean) => {
  //   setHeaderCollapse(status);
  //   localStorage.ideHeaderCollapse = status;
  // }, []);

  // const hideAll = useCallback(() => {
  //   toggleComponentCollapse(true);
  //   togglePropsCollapse(true);
  //   toggleHeaderCollapse(true);
  // }, []);

  // const showAll = useCallback(() => {
  //   toggleComponentCollapse(false);
  //   togglePropsCollapse(false);
  //   toggleHeaderCollapse(false);
  // }, []);

  // const { manangerProps } = props;
  // const [preview, setPreview] = useState(false);
  // const [theme, setTheme] = useState("default");
  // const [info, setInfo] = useState({});
  // const [focusMode, updateFocusMode] = useState({} as any);
  // const contextValue = useMemo<DrawingBoardContext>(
  //   () => ({
  //     preview,
  //     togglePreview: async () => {
  //       await switchPreview();
  //     },
  //     info,
  //     updateInfo: (schema: ILayoutSchema) => {
  //       const myInfo = Object.assign({}, info, schema);
  //       setInfo(myInfo);
  //     },
  //     theme: "default",
  //     toggleTheme: (theme: string) => {
  //       setTheme(theme);
  //     },
  //     propsCollapsed,
  //     toggleCollapsed: (propsCollapsed: boolean) => {
  //       togglePropsCollapse(propsCollapsed);
  //     },
  //     dataSourceProps: manangerProps,
  //     focusMode,
  //     updateFocusMode
  //   }),
  //   [preview, theme, info, propsCollapsed, focusMode]
  // );
  // const contextValue = useMemo<IDrawingBoardContext>(
  //   () => ({
  //     showTab: "",
  //     activeTab: (tab: string) => {},
  //     layout: "",
  //     setLayout: (path: string) => {},
  //     focusMode: { isFocus: false, topSchema: {} },
  //     updateFocusMode: false,
  //     help: "",
  //     setHelp: (help: string) => {},
  //     refresh: "",
  //     toggleRefresh: (refresh: string) => {}
  //   }),
  //   [focusMode]
  // );

  // const switchPreview = async () => {
  //   const rootNode = getActiveUINode() as UINode;
  //   await rootNode.updateLayout();
  //   rootNode.sendMessage(true);
  //   togglePreview();
  // };

  // short cut
  // useEffect(() => {
  //   const element = document.getElementById("drawingboard");
  //   if (element)
  //     element.ondblclick = e => {
  //       e.stopPropagation();
  //       togglePropsCollapse(!propsCollapsed);
  //     };
  // }, [propsCollapsed]);
  const [editNode, setEditNode] = useState();
  const contextValue = useMemo<IIDEEditorContext>(
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
      chooseEditNode: (editNode: IUINode) => {
        // console.log(editNode);
        setEditNode(editNode);
      }
    }),
    []
  );

  return (
    // <Context.DrawingBoardContext.Provider value={contextValue}>
    <IDEEditorContext.Provider value={contextValue}>
      <UIEngineDndProvider>
        <Header />

        <div className="ide-editor">
          <DesignManager datasource={props.datasource} />

          <Tabs defaultActiveKey="1">
            <TabPane tab="Drawing Board" key="1">
              <DrawingBoard {...props} />
            </TabPane>
            <TabPane tab="Code Editor" key="2">
              <CodeEditor />
            </TabPane>
          </Tabs>
          <PropManager />
        </div>
      </UIEngineDndProvider>
    </IDEEditorContext.Provider>
  );
};
