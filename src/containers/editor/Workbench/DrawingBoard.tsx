import React, { useCallback, useEffect, useContext, useMemo } from "react";
// import { Tabs, Icon } from 'antd';
// import { LayoutManager } from "./LayoutManager";
import _ from "lodash";
import { UIEngine, UIEngineRegister, PluginManager } from "uiengine";
import { UIEngineDndWrapper } from "../../dnd";
import { GlobalContext, SchemasContext, IDEEditorContext } from "../../Context";
import { cloneUINode, DndNodeManager, VersionControl } from "../../../helpers";
import * as plugins from "../../../helpers/plugins";
UIEngineRegister.registerPlugins(plugins);
// console.log(plugins, PluginManager.plugins);

// const fileLoader = FileLoader.getInstance();
export const DrawingBoard: React.FC = (props: any) => {
  const { preview, propsCollapsed, togglePropsCollapsed } = useContext(
    GlobalContext
  );
  const { updateSchema } = useContext(SchemasContext);
  const { editNode, chooseEditNode } = useContext(IDEEditorContext);
  const { layouts, config = {} } = props;
  let schemas = layouts;

  let productWrapper = useMemo(
    () => _.get(config, `widgetConfig.componentWrapper`),
    []
  );
  if (!preview) {
    _.set(config, `widgetConfig.componentWrapper`, UIEngineDndWrapper);
    _.set(config, `ideMode`, true);
  } else {
    _.set(config, `widgetConfig.componentWrapper`, productWrapper);
    _.set(config, `ideMode`, false);
  }

  // _.set(config, `widgetConfig.uiengineWrapper`, UIEngineDndProvider);
  const keyPressActions = useCallback(
    async (e: any) => {
      const versionControl = VersionControl.getInstance();
      if (e.ctrlKey && e.code === "KeyZ") {
        const schema = await versionControl.undo();
        updateSchema({ schema });
      }

      if (e.ctrlKey && e.shiftKey && e.code === "KeyZ") {
        const schema = await versionControl.redo();
        updateSchema({ schema });
      }

      // duplicate | delete
      const keyMap = {
        KeyD: "down",
        KeyU: "up",
        KeyL: "left",
        KeyR: "right"
      };
      if (editNode && e.target.localName === "body") {
        e.preventDefault();
        // dup: Bug: ^D  will recover downwards elements
        if (e.ctrlKey && keyMap[e.code] && editNode) {
          const newUiNode = await cloneUINode(editNode, keyMap[e.code]);
          chooseEditNode(newUiNode);
        }
        // delete
        if (e.key === "Delete" || (e.code === "KeyD" && !preview)) {
          const dndNodeManager = DndNodeManager.getInstance();
          await dndNodeManager.delete(editNode);
          // to show schema corret on prop window
          updateSchema(editNode.schema);
          chooseEditNode(null);
        }
        return false;
      }
    },
    [editNode]
  );
  useEffect(() => {
    // Update the document title using the browser API
    window.onkeydown = keyPressActions;
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
