import React from "react";
import _ from "lodash";
// import MonacoEditor from "react-monaco-editor";
import { ControlledEditor } from "@monaco-editor/react";
import { IDEEditorContext } from "../../Context";
import { FileLoader, getActiveUINode, cleanSchema } from "../../../helpers";
const editorOptions = {
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: "on",
  accessibilitySupport: "auto",
  autoIndent: false,
  automaticLayout: true,
  codeLens: true,
  colorDecorators: true,
  contextmenu: true,
  cursorBlinking: "blink",
  cursorSmoothCaretAnimation: false,
  cursorStyle: "line",
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,
  dragAndDrop: false,
  fixedOverflowWidgets: false,
  folding: true,
  foldingStrategy: "auto",
  fontLigatures: false,
  formatOnPaste: false,
  formatOnType: false,
  hideCursorInOverviewRuler: false,
  highlightActiveIndentGuide: true,
  links: true,
  mouseWheelZoom: false,
  multiCursorMergeOverlapping: true,
  multiCursorModifier: "alt",
  overviewRulerBorder: true,
  overviewRulerLanes: 2,
  quickSuggestions: true,
  quickSuggestionsDelay: 100,
  readOnly: false,
  renderControlCharacters: false,
  renderFinalNewline: true,
  renderIndentGuides: true,
  renderLineHighlight: "all",
  renderWhitespace: "none",
  revealHorizontalRightPadding: 30,
  roundedSelection: true,
  rulers: [],
  scrollBeyondLastColumn: 5,
  scrollBeyondLastLine: true,
  selectOnLineNumbers: true,
  selectionClipboard: true,
  selectionHighlight: true,
  showFoldingControls: "mouseover",
  smoothScrolling: false,
  suggestOnTriggerCharacters: true,
  wordBasedSuggestions: true,
  wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
  wordWrap: "off",
  wordWrapBreakAfterCharacters: "\t})]?|&,;",
  wordWrapBreakBeforeCharacters: "{([+",
  wordWrapBreakObtrusiveCharacters: ".",
  wordWrapColumn: 80,
  wordWrapMinified: true,
  wrappingIndent: "none"
};

export class CodeEditor extends React.Component<any, any> {
  handleEditorDidMount(getter: any, editor: any) {
    // const { data: tabData } = this.props;
    // const that = this;
    // editor.onDidChangeModelContent((e: any) => {
    //   console.log(e, tabData);
    // });
  }

  fetchContent() {
    const { data: tabData } = this.props;
    let tabContent = {} as IContentList;
    const file = _.get(tabData, "tab", "");
    if (file) {
      tabContent = _.find(this.context.content, {
        file
      });
    }
    return tabContent;
  }

  onEditorChange(ev: any, value: any) {
    const tabContent = this.fetchContent();
    const debounceFunc = _.debounce((value: any) => {
      if (tabContent) {
        const fileLoader = FileLoader.getInstance();
        const { file, type } = tabContent;
        tabContent.content = value;
        fileLoader.saveFile(file, value, type as EResourceType);
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
  }

  cleanContent(value: any) {
    const { data: tabData } = this.props;
    if (value && _.get(tabData, "type") === "schema") {
      try {
        value = JSON.parse(value);
        value = cleanSchema(value, true);
        value = JSON.stringify(value, null, "\t");
      } catch {}
    }
    return value;
  }

  render() {
    const { data: tabData } = this.props;
    const type = _.get(tabData, "language", "schema");

    const language =
      type === "schema" || type === "datasource" ? "json" : "typescript";

    const tabContent = this.fetchContent();

    return (
      <div className="editor code-editor">
        <ControlledEditor
          language={language}
          value={this.cleanContent(_.get(tabContent, "content"))}
          theme="dark"
          options={editorOptions}
          height="100%"
          editorDidMount={this.handleEditorDidMount.bind(this)}
          onChange={this.onEditorChange.bind(this)}
          loading="Loading..."
        />
      </div>
    );
  }
}

CodeEditor.contextType = IDEEditorContext;
