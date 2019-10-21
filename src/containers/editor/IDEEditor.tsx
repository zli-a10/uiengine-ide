import React, { useState, useMemo, useCallback, useEffect } from "react";
import * as _ from "lodash";
import { IUINode } from "uiengine/typings";
import { Main, DesignManager, PropManager } from "./";
import { IDEEditorContext } from "../Context";
import { UIEngineDndProvider } from "../dnd";
import * as Providers from "./Providers";
import { IDE_ID } from "../../helpers";
import "./styles/index.less";
import ErrorBoundary from "./ErrorBoundary";
import { Start } from "./Helper";
import { EditorTabs } from "./Workbench/EditorTabs";

export const IDEEditor: React.FC<IIDEEditor> = props => {
  const [currentTab, setCurrentTab] = useState("drawingboard");
  const [tabs, setTabs] = useState([]);
  const [editNode, setEditNode] = useState();
  const [content, setContent] = useState([]);
  const [collapsedNodes, setCollapsedNodes] = useState<Array<string>>([]);

  const ideEditorContextValue = useMemo<IIDEEditorContext>(
    () => ({
      tabs,
      showTab: currentTab,
      activeTab: (tab: string, language?: string) => {
        const newTabs: any = _.cloneDeep(tabs);
        let current: string = tab;
        const db = "drawingboard";
        if (tab.indexOf(db) !== -1) {
          const segs = tab.split(":");
          if (segs[1]) current = segs[1];
        }
        if (!_.find(tabs, { tab: current }) && db !== current) {
          newTabs.push({ tab: current, language });
          setTabs(newTabs);
        }
        if (tab.indexOf(db) !== -1) {
          setCurrentTab(db);
        } else {
          setCurrentTab(current);
        }
      },
      removeTab: (tab: string) => {
        const newTabs: any = _.cloneDeep(tabs);
        const index: any = _.findIndex(newTabs, { tab });
        if (index > -1) {
          let current = newTabs[index + 1]
            ? newTabs[index + 1]
            : newTabs[index - 1];
          newTabs.splice(index, 1);
          setTabs(newTabs);
          if (!current) {
            current = "drawingboard";
          } else {
            current = current.tab;
          }
          setCurrentTab(current);
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
    [editNode, collapsedNodes, content, tabs]
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
            <Main datasource={props.datasource}>
              <div className="ide-editor">
                <DesignManager datasource={props.datasource} />
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
