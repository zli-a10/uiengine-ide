import React, { useState, useContext, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { SchemasContext } from "../../Context";
import { FileLoader } from "../../../helpers";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export const CodeEditor: React.FC = (props: any) => {
  const { currentData } = useContext(SchemasContext);

  const { layouts, config = {} } = props;
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
        setLanguage("json");
      }
      const fileLoader = FileLoader.getInstance();
      const newPromise = fileLoader.loadFile(path, type, isTemplate);
      newPromise.then((content: any) => {
        if (type === "schema" || type === "datasource") {
          content = JSON.stringify(content, undefined, "\n\t");
        }
        setCode(content);
      });
    }
  }, [currentData]);

  const onEditorChange = () => {};

  return (
    <div className="editor code-editor">
      <MonacoEditor
        language="typescript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onEditorChange}
      />
    </div>
  );
};
