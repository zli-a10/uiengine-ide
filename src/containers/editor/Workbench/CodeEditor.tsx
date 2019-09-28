import React, { useState, useContext, useEffect, useCallback } from "react";
import _ from "lodash";
// import MonacoEditor from "react-monaco-editor";
import { ControlledEditor } from "@monaco-editor/react";
import { SchemasContext, IDEEditorContext } from "../../Context";
import { FileLoader, DndNodeManager, getActiveUINode } from "../../../helpers";

let debounced: any;
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

      // setCode(content);
    }
  }, [currentData]);

  const onEditorChange = useCallback(
    (ev: any, value: any) => {
      // if (debounced) {
      //   console.log("cancel debounce...");
      //   debounced.cancel();
      // }
      console.log(currentData);
      const debounceFunc = () => {
        if (currentData) {
          const fileLoader = FileLoader.getInstance();
          const { _path_: path, type } = currentData;
          fileLoader.saveFile(path, value, type);
          if (type === "schema") {
            const dndNodeManager = DndNodeManager.getInstance();
            try {
              const schema = JSON.parse(value);
              if (schema) {
                const node = getActiveUINode();
                console.log("schema to use", schema);
                dndNodeManager.useSchema(node, schema);
              }
            } catch (e) {
              console.warn("Your UI JSON is not correct %s", value);
            }
          }
        }
      };
      // setContent(value);
      // debounced = _.debounce(debounceFunc, 1000)();
      debounceFunc();
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
