import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef
} from "react";
import _ from "lodash";
// import MonacoEditor from "react-monaco-editor";
import { ControlledEditor } from "@monaco-editor/react";
import { SchemasContext, IDEEditorContext } from "../../Context";
import { FileLoader, getActiveUINode, cleanSchema } from "../../../helpers";

export const CodeEditor = (props: any) => {
  const { data: editingResource } = props;
  // const { editingResource } = useContext(SchemasContext);
  // const { content, setContent } = useContext(IDEEditorContext);
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

  const editorRef = useRef();
  const valueGetter = useRef();
  const handleEditorDidMount = useCallback(
    (getter: any, editor: any) => {
      editorRef.current = editor;
      valueGetter.current = getter;
      editor.onDidChangeModelContent((e: any) => {
        // console.log(e, editingResource);
      });
      // Now you can use the instance of monaco editor
      // in this component whenever you want
    },
    [editingResource]
  );

  const onEditorChange = useCallback(
    (ev: any, value: any) => {
      const debounceFunc = _.debounce((value: any) => {
        if (editingResource) {
          const fileLoader = FileLoader.getInstance();
          const { _path_: path, type } = editingResource;
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
    [editingResource]
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
    [editingResource]
  );

  // function listenEditorChagnes() {
  //   editorRef.current.onDidChangeModelContent(ev => {
  //     console.log(editorRef.current.getValue());
  //   });
  // }

  return (
    <div className="editor code-editor">
      <ControlledEditor
        language={language}
        value={cleanContent(editingResource.content)}
        theme="dark"
        options={options}
        height="100%"
        editorDidMount={handleEditorDidMount}
      />
    </div>
  );
};
