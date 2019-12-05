import React, {
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useState
} from "react";
import _ from "lodash";
import { UIEngine, UIEngineRegister } from "uiengine";
import { UIEngineDndWrapper } from "../../dnd";
import { GlobalContext, SchemasContext, IDEEditorContext } from "../../Context";
import {
  VersionControl,
  useDeleteNode,
  useCloneNode,
  FileLoader,
  ShortcutManager
} from "../../../helpers";
import * as plugins from "../../../helpers/plugins";

UIEngineRegister.registerPlugins(plugins);

export const DrawingBoard: React.FC = (props: any) => {
  const {
    preview
    // togglePropsCollapsed,
    // componentCollapsed,
    // toggleComponentCollapsed
  } = useContext(GlobalContext);
  const { updateSchema } = useContext(SchemasContext);
  const { editNode } = useContext(IDEEditorContext);
  const { layouts, config = {} } = props;
  const schemas = layouts;

  schemas[0].id = "drawingboard";
  const [schema, setSchema] = useState(schemas);
  let productWrapper = useMemo(
    () => _.get(config, "widgetConfig.componentWrapper"),
    []
  );
  const newConfig = _.cloneDeep(config);

  if (!preview) {
    _.set(newConfig, "widgetConfig.componentWrapper", UIEngineDndWrapper);
    _.set(newConfig, "ideMode", true);
  } else {
    _.set(newConfig, "widgetConfig.componentWrapper", productWrapper);
    _.set(newConfig, "ideMode", false);
  }

  let deleteEditNode = useDeleteNode(editNode);
  let cloneEditNode = useCloneNode(editNode);

  // _.set(config, `widgetConfig.uiengineWrapper`, UIEngineDndProvider);
  const keyPressActions = useCallback(
    async (e: any) => {
      // // those allowBubbleKeys set on Main.tsx for preview, attribute window, hide/show windows, save file
      // const allowBubbleKeys = ["KeyV", "KeyA", "KeyH", "KeyS"];
      // console.log(allowBubbleKeys.indexOf(e.code), e.code);
      // if (allowBubbleKeys.indexOf(e.code) === -1) return false;

      // console.log(e);
      // // shortcut ctrl+z
      // const versionControl = VersionControl.getInstance();
      // if (e.ctrlKey && e.code === "KeyZ") {
      //   const schema = await versionControl.undo();

      //   updateSchema({ schema });
      // }

      // if (e.ctrlKey && e.shiftKey && e.code === "KeyZ") {
      //   const schema = await versionControl.redo();

      //   updateSchema({ schema });
      // }

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
  const ctrlZ = useCallback(async () => {
    const versionControl = VersionControl.getInstance();
    const schema = await versionControl.undo();
    updateSchema({ schema });
  }, []);

  const ctrlShiftZ = useCallback(async () => {
    const versionControl = VersionControl.getInstance();
    const schema = await versionControl.redo();

    updateSchema({ schema });
  }, []);

  const duplicate = useCallback(
    e => {
      const keyMap = {
        KeyD: "down",
        KeyU: "up",
        KeyL: "left",
        KeyR: "right"
      };

      if (editNode && e.target.localName === "body") {
        e.preventDefault();
        // dup: Bug: ^D  will recover downwards elements
        if (keyMap[e.code] && editNode) {
          cloneEditNode(keyMap[e.code])();
        }
      }
    },
    [editNode]
  );

  const deleteNode = useCallback(
    e => {
      if (editNode && e.target.localName === "body") {
        e.preventDefault();
        // dup: Bug: ^D  will recover downwards elements
        // delete
        deleteEditNode();
      }
    },
    [preview, editNode]
  );

  useEffect(() => {
    // Update the document title using the browser API
    const shortcutManger = ShortcutManager.getInstance();
    const shortcuts = {
      ctrlZ,
      ctrlShiftZ,
      ctrlD: duplicate,
      ctrlU: duplicate,
      ctrlL: duplicate,
      ctrlR: duplicate,
      Delete: deleteNode,
      d: deleteNode
    };
    shortcutManger.register(shortcuts);
  }, [editNode, preview]);

  useEffect(() => {
    // Update the document title using the browser API
    // window.addEventListener("keydown", keyPressActions);
    // const drawingboard = document.getElementById("drawingboard");
    // if (drawingboard) {
    //   drawingboard.ondblclick = (e: any) => {
    //     e.stopPropagation();
    //     toggleComponentCollapsed(!componentCollapsed);
    //     togglePropsCollapsed(!componentCollapsed);
    //   };
    // }
    const initActiveTab = async () => {
      let activeTab = JSON.parse(localStorage.cachedActiveTab || "{}");

      if (!_.isEmpty(activeTab)) {
        const fileLoader = FileLoader.getInstance();
        const data = await fileLoader.loadFile(
          activeTab.tabName,
          "schema",
          activeTab.isTemplate
        );
        const newSchema = _.cloneDeep(schema);

        newSchema[0].layout = data;
        setSchema(newSchema);
      }
    };

    initActiveTab();
  }, [localStorage.cachedActiveTab]);

  return (
    <div className="editor" id="drawingboard">
      <UIEngine layouts={schema} config={newConfig} />
    </div>
  );
};
