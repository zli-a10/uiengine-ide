import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo
} from "react";
import _ from "lodash";
// import MonacoEditor from "react-monaco-editor";
import { ControlledEditor } from "@monaco-editor/react";
import { SchemasContext, IDEEditorContext } from "../../Context";
import { FileLoader, getActiveUINode } from "../../../helpers";

export const CodeEditor: React.FC = (props: any) => {
  const { currentData } = useContext(SchemasContext);
  const { content, setContent } = useContext(IDEEditorContext);
  // const { layouts, config = {} } = props;
  const options = {
    selectOnLineNumbers: true,
    acceptSuggestionOnCommitCharacter: true,
    autoIndent: true,
    automaticLayout: true,
    dragAndDrop: true,
    folding: true,
    highlightActiveIndentGuide: true,
    mouseWheelZoom: true
  };

  // const [code, setCode] = useState(content);
  const [language, setLanguage] = useState("json");

  useEffect(() => {
    // load remote data
    if (currentData) {
      const { type } = currentData;
      if (type === "schema") {
        setLanguage("json");
      } else {
        setLanguage("typescript");
      }
    }
  }, [currentData]);

  // const [currentFile, setCurrentFile] = useState(
  //   localStorage["currentEditNode"]
  // );
  // const changedFile: boolean = useMemo(() => {
  //   if (localStorage["currentEditNode"]) {
  //     const currentNode = JSON.parse(localStorage["currentEditNode"]);
  //     const { _path_: path } = currentNode;
  //     setCurrentFile(path);
  //     return currentFile === path;
  //   }
  //   return true;
  // }, [localStorage["currentEditNode"]]);

  // useEffect(() => {
  //   setCurrentFile(localStorage["currentEditNode"]);
  // }, [localStorage["currentEditNode"]]);

  const debounceFunc = useCallback(
    _.debounce((value: any) => {
      if (localStorage["currentEditNode"]) {
        // why can't directly use current Data, because I can't get the current
        // Data right here, why??
        const currentNode = JSON.parse(localStorage["currentEditNode"]);
        const fileLoader = FileLoader.getInstance();
        const { _path_: path, type } = currentNode;
        fileLoader.saveFile(path, value, type);
        if (type === "schema") {
          try {
            const schema = JSON.parse(value);
            if (schema) {
              const uiNode = getActiveUINode();
              uiNode.schema = schema;
              uiNode.updateLayout();
              uiNode.sendMessage(true);
            }
          } catch (e) {
            console.warn("Your UI JSON is not correct %s", value);
          }
        }
      }
    }, 1000),
    []
  );

  const onEditorChange = useCallback(
    (ev: any, value: any) => {
      debounceFunc(value);
      return value;
    },
    [currentData]
  );

  return (
    <div className="editor code-editor">
      <ControlledEditor
        language={language}
        value={content}
        theme="dark"
        onChange={onEditorChange}
        options={options}
      />
    </div>
  );
};
