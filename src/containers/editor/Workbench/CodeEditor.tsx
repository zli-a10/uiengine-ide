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
      if (type === "schema" || type === "datasource") {
        setLanguage("json");
      } else {
        setLanguage("typescript");
      }
    }
  }, [currentData]);

  const debounceFunc = useCallback(
    _.debounce((value: any) => {
      if (currentData) {
        const currentNode = currentData;
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
    [currentData]
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
