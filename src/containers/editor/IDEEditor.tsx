import React, { useState, useMemo } from "react";

import * as _ from "lodash";
import { Tabs } from "antd";
import { Main, DesignManager, PropManager, DrawingBoard, CodeEditor } from "./";
import { IDEEditorContext } from "../Context";
import { UIEngineDndProvider } from "../dnd";
const { TabPane } = Tabs;
import * as Providers from "./Providers";
import { IDE_ID } from "../../helpers";
import "./styles/index.less";

import { IUINode } from "uiengine/typings";

export const IDEEditor: React.FC<IIDEEditor> = props => {
  const [editNode, setEditNode] = useState();
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
      }
    }),
    [editNode, collapsedNodes]
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
