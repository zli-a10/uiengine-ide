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
import { FileLoader, getActiveUINode, cleanSchema } from "../../../helpers";

// on change always used the old value , even editingResource changed
// to fix this bug, declared this global static varaible
let currentNode: any;
export const CodeEditor: React.FC = (props: any) => {
  const { editingResource } = useContext(SchemasContext);
  currentNode = editingResource;
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
    if (editingResource) {
      const { type } = editingResource;
      if (type === "schema" || type === "datasource") {
        setLanguage("json");
      } else {
        setLanguage("typescript");
      }
    }
  }, [editingResource]);

  const onEditorChange = useCallback(
    (ev: any, value: any) => {
      const debounceFunc = _.debounce((value: any) => {
        if (currentNode) {
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
      }, 1000);
      debounceFunc(value);
      return value;
    },
    [currentNode]
  );

  const cleanContent = useCallback(
    (value: any) => {
      if (value && _.get(editingResource, "type") === "schema") {
        try {
          value = JSON.parse(value);
          value = cleanSchema(value, true);
          value = JSON.stringify(value, null, "\t");
        } catch {}
      }
      return value;
    },
    [content, editingResource]
  );

  return (
    <div className="editor code-editor">
      <ControlledEditor
        language={language}
        value={cleanContent(content)}
        theme="dark"
        onChange={onEditorChange}
        options={options}
      />
    </div>
  );
};
