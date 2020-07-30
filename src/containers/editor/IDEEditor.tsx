import React, { useState, useMemo, useCallback, useEffect } from "react";
import * as _ from "lodash";
import { MemoStore } from "uiengine";
import { IUINode } from "uiengine/typings";
import { Main, DesignManager, PropManager } from "./";
import { IDEEditorContext } from "../Context";
import { UIEngineDndProvider } from "../dnd";
import * as Providers from "./Providers";
import {
  IDE_ID,
  getActiveUINode,
  FileLoader,
  VersionControl
} from "../../helpers";
import "./styles/index.less";
// import ErrorBoundary from "./ErrorBoundary";
import { Start } from "./Helper";
import { EditorTabs } from "./Workbench/EditorTabs";

export const IDEEditor: React.FC<IIDEEditor> = props => {
  const [currentTab, setCurrentTab] = useState("drawingboard");
  const [activeTabName, setActiveTabName] = useState("drawingboard");
  const [tabs, setTabs] = useState([]);
  const [editNode, setEditNode] = useState();
  const [content, setContent] = useState<Array<IContentList>>([]);
  const [collapsedNodes, setCollapsedNodes] = useState<Array<string>>([]);

  useEffect(() => {
    MemoStore.bucket.preview = false;
  }, []);

  const ideEditorContextValue = useMemo<IIDEEditorContext>(
    () => ({
      tabs,
      showTab: currentTab,
      activeTabName: activeTabName,
      activeTab: (
        tab: string,
        language?: string,
        oldTabName?: string,
        isTemplate?: boolean
      ) => {
        const newTabs: any = _.clone(tabs);
        let current: string = tab;
        const drawingBoard = "drawingboard";

        if (!language) language = "schema";
        if (tab.indexOf(drawingBoard) !== -1) {
          const segs = tab.split(":");

          if (segs[1]) current = segs[1];
        }
        if (current !== drawingBoard && language === "schema") {
          localStorage.cachedActiveTab = JSON.stringify({
            tabName: current,
            isTemplate
          });
        }
        if (oldTabName) {
          const tabOld = _.find(newTabs, { tab: oldTabName });

          if (!tabOld) return;
          if (_.isObject(tabOld)) _.set(tabOld, "tab", current);
        } else if (
          !_.find(tabs, { tab: current }) &&
          drawingBoard !== current
        ) {
          newTabs.push({ tab: current, language });
          setTabs(newTabs);
        }
        setActiveTabName(current);
        if (language === "schema") {
          if (localStorage["drawingBoardLayout"]) {
            setCurrentTab(current);
          } else {
            if (tab.indexOf(drawingBoard) !== -1) {
              setCurrentTab(drawingBoard);
            } else {
              setCurrentTab(current);
            }
          }
        } else {
          setCurrentTab(current);
        }
      },
      removeTab: (deleteTabs: string[]) => {
        debugger
        const newTabs: any = _.clone(tabs);
        const newContentList: any = _.clone(content);
        const fileLoader = FileLoader.getInstance();
        const versionControl = VersionControl.getInstance();
        versionControl.clearHistories();

        deleteTabs.forEach((deleteTab: string) => {
          const index: any = _.findIndex(newTabs, { tab: deleteTab });
          //remove tab
          if (index > -1) {
            newTabs.splice(index, 1);
          }
          //remove content
          const conentIndex = _.findIndex(newContentList, { file: deleteTab });
          if (conentIndex > -1) {
            newContentList.splice(conentIndex, 1);
          }
        })
        if (newTabs.length === 0) {
          localStorage.cachedActiveTab = JSON.stringify({});
          fileLoader.editingFile = "";
          setCurrentTab("drawingboard");
          const sandbox: any = {
            component: "div",
            props: {
              className: "sandbox"
            },
            children: [
              {
                component: "h1",
                content: "Sandbox"
              },
              {
                component: "p",
                content:
                  "Please Drag and Drop an element from left Components tab, and then try to edit it on prop window."
              }
            ]
          };
          try {
            const uiNode = getActiveUINode();
            uiNode.schema = sandbox;
            uiNode.refreshLayout();
            uiNode.sendMessage(true);
          } catch (e) {
            console.error(e);
          }
        } else if (_.includes(deleteTabs, fileLoader.editingFile)) {
          fileLoader.editingFile = newTabs[0].tab
          setActiveTabName(newTabs[0].tab);
          localStorage.cachedActiveTab = JSON.stringify({
            tabName: newTabs[0].tab,
            isTemplate: false
          });
          if (newTabs[0].language === "schema") {
            const text = _.find(content, { file: newTabs[0].tab });

            if (text) {
              if (_.isString(text.content)) {
                try {
                  const schema = JSON.parse(text.content);
                  const uiNode = getActiveUINode();

                  uiNode.schema = schema;
                  uiNode.refreshLayout();
                  uiNode.sendMessage(true);
                } catch (e) {
                  console.error(e);
                }
              }
            }
            if (localStorage["drawingBoardLayout"]) {
              setCurrentTab(newTabs[0].tab);
            } else {
              setCurrentTab("drawingboard");
            }
          } else {
            setCurrentTab(newTabs[0].tab);
          }
        }
        setTabs(newTabs);
        setContent(newContentList);
      },
      layout: "",
      setLayout: (path: string) => { },
      focusMode: { isFocus: false, topSchema: {} },
      updateFocusMode: false,
      help: "",
      setHelp: (help: string) => { },
      refresh: "",
      toggleRefresh: (refresh: string) => { },
      editNode,
      chooseEditNode: (editNode?: IUINode) => {
        setEditNode(editNode);
      },
      collapsedNodes,
      setCollapsedNode: (uiNode: IUINode) => {
        let id = _.get(uiNode, IDE_ID, _.uniqueId(IDE_ID));
        const index = collapsedNodes.indexOf(id);

        if (index === -1) {
          _.set(uiNode, IDE_ID, id);
          collapsedNodes.push(id);
        } else {
          _.unset(uiNode, IDE_ID);
          collapsedNodes.splice(index, 1);
        }
        // console.log("collapsedNodes", collapsedNodes);
        setCollapsedNodes(_.clone(collapsedNodes));
      },
      content,
      setContent: (data: IContentList) => {
        const newContentList: any = _.clone(content);
        const { file, type, content: newContent } = data;

        if (_.isObject(newContent)) {
          data.content = JSON.stringify(newContent, null, "\t");
        }
        const index = _.findIndex(newContentList, { type, file });

        if (index > -1) {
          newContentList[index] = data;
        } else {
          newContentList.push(data);
        }
        setContent(newContentList);
      }
    }),
    [editNode, collapsedNodes, content, tabs, activeTabName]
  );

  // show start ?
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // show guide
    const showGuideStatus =
      localStorage["showGuide"] === undefined
        ? true
        : localStorage["showGuide"] !== "false";

    setShowGuide(showGuideStatus);
  }, [localStorage["drawingBoardLayout"], localStorage["showGuide"]]);

  const onCloseGuide = useCallback(() => {
    setShowGuide(false);
    localStorage["showGuide"] = false;
  }, []);

  return (
    // <ErrorBoundary>
    <IDEEditorContext.Provider value={ideEditorContextValue}>
      <UIEngineDndProvider>
        <Providers.Schemas>
          {/*
            <Providers.Props>
              <Providers.Components> */}
          <Main>
            <div className="ide-editor" id="ide-editor">
              <DesignManager />
              <EditorTabs {...props} activeKey={currentTab} tabs={tabs} />
              <PropManager {...props} />
            </div>
          </Main>
          <Start onClose={onCloseGuide} opened={showGuide} />

          {/* </Providers.Components>
            </Providers.Props>
          </Providers.Schemas> */}
        </Providers.Schemas>
      </UIEngineDndProvider>
    </IDEEditorContext.Provider>
    // </ErrorBoundary>
  );
};
