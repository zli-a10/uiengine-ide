import React, { useState, useEffect, useContext } from "react";
// import { Tabs, Icon } from 'antd';
// import { LayoutManager } from "./LayoutManager";
import _ from "lodash";
import { UIEngine } from "uiengine";
import { UIEngineDndWrapper } from "../../dnd";
import { VersionControl } from "../../../helpers";
import { GlobalContext, SchemasContext, IDEEditorContext } from "../../Context";
import { cloneUINode } from "../../../helpers";

// const fileLoader = FileLoader.getInstance();
export const DrawingBoard: React.FC = (props: any) => {
  const { preview, propsCollapsed, togglePropsCollapsed } = useContext(
    GlobalContext
  );
  const { updateSchema } = useContext(SchemasContext);
  const { editNode, chooseEditNode } = useContext(IDEEditorContext);
  const { layouts, config = {} } = props;
  let schemas = layouts;

  _.set(config, `widgetConfig.componentWrapper`, UIEngineDndWrapper);
  if (!preview) {
    _.set(config, `ideMode`, true);
  } else {
    _.set(config, `ideMode`, false);
  }
  // _.set(config, `widgetConfig.uiengineWrapper`, UIEngineDndProvider);
  const keyPressActions = async (e: any) => {
    e.stopPropagation();
    const versionControl = VersionControl.getInstance();
    if (e.ctrlKey && e.code === "KeyZ") {
      const schema = await versionControl.undo();
      updateSchema({ schema });
    }

    if (e.ctrlKey && e.shiftKey && e.code === "KeyZ") {
      const schema = await versionControl.redo();
      updateSchema({ schema });
    }

    // duplicate
    const keyMap = {
      KeyD: "down",
      KeyU: "up",
      KeyL: "left",
      KeyR: "right"
    };
    if (editNode) {
      if (e.ctrlKey && keyMap[e.code] && editNode) {
        const newUiNode = await cloneUINode(editNode, keyMap[e.code]);
        chooseEditNode(newUiNode);
      }
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    document.body.onkeypress = keyPressActions;
    const drawingboard = document.getElementById("drawingboard");
    if (drawingboard) {
      drawingboard.ondblclick = () => togglePropsCollapsed(!propsCollapsed);
    }
    // const propManager = document.getElementsByClassName('manager');
    // if (propManager.length) {
    //   propManager[0].ondblclick = () => togglePropsCollapsed(!propsCollapsed);
    // }
    // const header = document.getElementsByClassName('ide-header')[0];
  }, [editNode, propsCollapsed]);
  return (
    <div className="editor" id="drawingboard">
      {/* <LayoutManager layout={layout} /> */}
      <UIEngine layouts={schemas} config={config} />
    </div>
  );
};
