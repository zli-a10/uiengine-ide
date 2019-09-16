import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";

export const CodeEditor: React.FC = (props: any) => {
  const { layouts, config = {} } = props;
  const options = {
    // selectOnLineNumbers: true,
    // acceptSuggestionOnCommitCharacter: true,
    // autoIndent: true,
    // automaticLayout: true,
    // dragAndDrop: true,
    // folding: true,
    // foldingStrategy: "auto",
    // highlightActiveIndentGuide: true,
    // mouseWheelZoom: true,
    // multiCursorModifier: "ctrlCmd"
  };

  const [code, setCode] = useState("");

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
