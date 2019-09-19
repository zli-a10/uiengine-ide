import React, { useCallback, useEffect, useContext, useMemo } from "react";
import _ from "lodash";
import { UIEngine, UIEngineRegister } from "uiengine";
import { UIEngineDndWrapper } from "../../dnd";
import { GlobalContext, SchemasContext, IDEEditorContext } from "../../Context";
import { VersionControl, useDeleteNode, useCloneNode } from "../../../helpers";
import * as plugins from "../../../helpers/plugins";

UIEngineRegister.registerPlugins(plugins);

export const DrawingBoard: React.FC = (props: any) => {
  const { preview, propsCollapsed, togglePropsCollapsed } = useContext(
    GlobalContext
  );
  const { updateSchema } = useContext(SchemasContext);
  const { editNode } = useContext(IDEEditorContext);
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

  let deleteEditNode = useDeleteNode(editNode);
  let cloneEditNode = useCloneNode(editNode);

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
          cloneEditNode(keyMap[e.code])();
        } else if (e.key === "Delete" || (e.code === "KeyD" && !preview)) {
          // delete
          deleteEditNode();
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
      drawingboard.ondblclick = () => {
        if (!preview) togglePropsCollapsed(!propsCollapsed);
      };
    }
  }, [editNode, propsCollapsed]);
  return (
    <div className="editor" id="drawingboard">
      {/* <LayoutManager layout={layout} /> */}
      <UIEngine layouts={schemas} config={config} />
    </div>
  );
};
