import React, { useState, useMemo, useCallback, useEffect } from "react";
import * as _ from "lodash";
import { IUINode } from "uiengine/typings";
import { Main, DesignManager, PropManager } from "./";
import { IDEEditorContext } from "../Context";
import { UIEngineDndProvider } from "../dnd";
import * as Providers from "./Providers";
import { IDE_ID, getActiveUINode, FileLoader, VersionControl } from "../../helpers";
import "./styles/index.less";
import ErrorBoundary from "./ErrorBoundary";
import { Start } from "./Helper";
import { EditorTabs } from "./Workbench/EditorTabs";

export const IDEEditor: React.FC<IIDEEditor> = props => {
  const [currentTab, setCurrentTab] = useState("drawingboard");
  const [activeTabName, setActiveTabName] = useState("drawingboard");
  const [tabs, setTabs] = useState([]);
  const [editNode, setEditNode] = useState();
  const [content, setContent] = useState<Array<IContentList>>([]);
  const [collapsedNodes, setCollapsedNodes] = useState<Array<string>>([]);

  const ideEditorContextValue = useMemo<IIDEEditorContext>(
    () => ({
      tabs,
      showTab: currentTab,
      activeTabName: activeTabName,
      activeTab: (tab: string, language?: string, oldTabName?: string) => {
        const newTabs: any = _.clone(tabs);
        let current: string = tab;
        const drawingBoard = "drawingboard";
        if (!language) language = "schema";
        if (tab.indexOf(drawingBoard) !== -1) {
          const segs = tab.split(":");
          if (segs[1]) current = segs[1];
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
          if (!!localStorage["drawingBoardLayout"]) {
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
      removeTab: (tab: string) => {
        const newTabs: any = _.clone(tabs);
        const index: any = _.findIndex(newTabs, { tab });
        if (index > -1) {
          let newCurrentTab = newTabs[index + 1]
            ? newTabs[index + 1]
            : newTabs[index - 1];
          newTabs.splice(index, 1);
          setTabs(newTabs);
          const fileLoader = FileLoader.getInstance()
          const versionControl = VersionControl.getInstance()
          versionControl.clearHistories()
          if (!newCurrentTab) {
            fileLoader.editingFile = ''
            setCurrentTab("drawingboard");
            const sandbox: any = {
              component: 'div',
              props: {
                className: 'sandbox'
              },
              children: [
                {
                  component: 'h1',
                  content: 'Sandbox'
                },
                {
                  component: 'p',
                  content:
                    'Please Drag and Drop an element from left Components tab, and then try to edit it on prop window.'
                }
              ]
            }
            try {
              const uiNode = getActiveUINode();
              uiNode.schema = sandbox;
              uiNode.updateLayout();
              uiNode.sendMessage(true);
            } catch (e) {
              console.error(e);
            }
          } else {
            fileLoader.editingFile = newCurrentTab.tab
            setActiveTabName(newCurrentTab.tab);
            if (newCurrentTab.language === "schema") {
              const text = _.find(content, { file: newCurrentTab.tab });
              if (text) {
                if (_.isString(text.content)) {
                  try {
                    const schema = JSON.parse(text.content);
                    const uiNode = getActiveUINode();
                    uiNode.schema = schema;
                    uiNode.updateLayout();
                    uiNode.sendMessage(true);
                  } catch (e) {
                    console.error(e);
                  }
                }
              }
              if (!!localStorage["drawingBoardLayout"]) {
                setCurrentTab(newCurrentTab.tab);
              } else {
                setCurrentTab("drawingboard");
              }
            } else {
              setCurrentTab(newCurrentTab.tab);
            }
          }
        }

        // remove content
        const newContentList: any = _.clone(content);
        const conentIndex = _.findIndex(newContentList, { file: tab });
        if (conentIndex > -1) {
          newContentList.splice(conentIndex, 1);
          setContent(newContentList);
        }
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
        : localStorage["showGuide"] === "false"
          ? false
          : true;
    setShowGuide(showGuideStatus);
  }, [localStorage["drawingBoardLayout"], localStorage["showGuide"]]);

  const onCloseGuide = useCallback(() => {
    setShowGuide(false);
    localStorage["showGuide"] = false;
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};
