import React, { useState, useMemo } from "react";

import * as _ from "lodash";
import { Tabs } from "antd";
import { Main, DesignManager, PropManager, DrawingBoard, CodeEditor } from "./";
import { IDEEditorContext } from "../Context";
import { UIEngineDndProvider } from "../dnd";
const { TabPane } = Tabs;
import * as Providers from "./Providers";

import "./styles/index.less";

import { IUINode } from "uiengine/typings";

export const IDEEditor: React.FC<IIDEEditor> = props => {
  const [editNode, setEditNode] = useState();
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
      chooseEditNode: (editNode: IUINode) => {
        // console.log(editNode);
        setEditNode(editNode);
      }
    }),
    [editNode]
  );

  return (
    <IDEEditorContext.Provider value={ideEditorContextValue}>
      <UIEngineDndProvider>
        <Providers.Schemas>
          <Providers.Props>
            <Providers.Components>
              <Main datasource={props.datasource}>
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
                  <PropManager {...props} />
                </div>
              </Main>
            </Providers.Components>
          </Providers.Props>
        </Providers.Schemas>
      </UIEngineDndProvider>
    </IDEEditorContext.Provider>
  );
};
