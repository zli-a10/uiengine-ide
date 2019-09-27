import React, { useState, useContext, useEffect, useCallback } from "react";
// import MonacoEditor from "react-monaco-editor";
import { ControlledEditor } from "@monaco-editor/react";
import { SchemasContext } from "../../Context";
import { FileLoader } from "../../../helpers";

export const CodeEditor: React.FC = (props: any) => {
  const { currentData } = useContext(SchemasContext);

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

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("json");

  useEffect(() => {
    // load remote data
    if (currentData) {
      const { _path_: path, type, isTemplate } = currentData;
      if (type === "schema") {
        setLanguage("json");
      } else {
        setLanguage("typescript");
      }
      const fileLoader = FileLoader.getInstance();
      const newPromise = fileLoader.loadFile(path, type, isTemplate);
      newPromise.then((content: any) => {
        if (type === "schema" || type === "datasource") {
          content = JSON.stringify(content, null, "\t");
        }
        setCode(content);
      });
    }
  });

  const onEditorChange = useCallback(
    (ev: any, value: any) => {
      const fileLoader = FileLoader.getInstance();
      if (currentData) {
        const { _path_: path, type } = currentData;
        fileLoader.saveFile(path, value, type);
      }
      return value;
    },
    [currentData]
  );

  return (
    <div className="editor code-editor">
      <ControlledEditor
        language={language}
        value={code}
        theme="dark"
        onChange={onEditorChange}
        options={options}
      />
    </div>
  );
};
