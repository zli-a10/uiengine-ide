import React, {
  useCallback,
  useState,
  useMemo,
  useContext,
  useEffect
} from "react";

import { Switch, Icon, Modal } from "antd";
import { UINode } from "uiengine";
import _ from "lodash";
import classnames from "classnames";

import { GlobalContext, SchemasContext, IDEEditorContext } from "../../Context";
import {
  getActiveUINode,
  FileLoader,
  saveFile,
  saveFileStatus,
  cleanSchema,
  MemoStore,
  ShortcutManager
} from "../../../helpers";
import { StagingFileTree } from "./StagingFileTree";

export const Main = (props: any) => {
  const { activeTab } = useContext(IDEEditorContext);
  const { refresh, toggleRefresh } = useContext(SchemasContext);

  // header collpase state
  const [headerCollapsed, setHeaderCollapse] = useState(
    localStorage.ideHeaderCollapse === "true"
  );
  const toggleHeaderCollapse = useCallback((status: boolean) => {
    setHeaderCollapse(status);
    localStorage.ideHeaderCollapse = status;
  }, []);

  // component collapse state
  const [componentCollapsed, setComponentCollapse] = useState(
    localStorage.ideComponentCollapse === "true"
  );

  const toggleComponentCollapse = useCallback((status: boolean) => {
    setComponentCollapse(status);
    localStorage.ideComponentCollapse = status;
  }, []);

  // props collapse state
  const [propsCollapsed, setPropsCollapse] = useState(
    localStorage.idePropsCollapse === "true"
  );
  const togglePropsCollapse = useCallback((status: boolean) => {
    setPropsCollapse(status);
    localStorage.idePropsCollapse = status;
  }, []);

  // preview collaspse state
  const [preview, setPreview] = useState(false);
  const switchPreview = useCallback(
    async (status: boolean) => {
      MemoStore.bucket.preview = status;
      const rootNode = getActiveUINode() as UINode;
      await rootNode.refreshLayout();
      rootNode.sendMessage(true);
      setPreview(status);
      activeTab("drawingboard");
    },
    [preview, activeTab]
  );

  const [resourceTree, setResourceTree] = useState({
    handler: [],
    plugin: [],
    component: [],
    schema: []
  });
  const [fileStatus, setFileStatus] = useState();
  const saveOpenFileStatus = useCallback((statusObj: IFileStatusGroup) => {
    // setFileStatus(statusObj);
    const { file, type, status } = statusObj;
    saveFileStatus(file, type, status);
  }, []);

  const contextValue = useMemo<IGlobalContext>(
    () => ({
      ideMode: true,
      preview,
      togglePreview: (preview: boolean) => {
        switchPreview(preview);
      },
      saved: false,
      theme: "",
      toggleTheme: (theme: string) => {},
      propsCollapsed,
      togglePropsCollapsed: (collapsed: boolean) => {
        togglePropsCollapse(collapsed);
      },
      headerCollapsed,
      toggleHeaderCollapsed: (collapsed: boolean) => {
        toggleHeaderCollapse(collapsed);
      },
      componentCollapsed,
      toggleComponentCollapsed: (collapsed: boolean) => {
        toggleComponentCollapse(collapsed);
      },
      resourceTree,
      setResourceTree: (tree: any, type?: EResourceType) => {
        let copyTree: any = _.clone(resourceTree);
        if (_.isArray(tree) && type) {
          copyTree[type] = tree;
        } else if (_.isObject(tree)) {
          copyTree = _.assign(copyTree, tree);
        }
        setResourceTree(copyTree);
      },
      fileStatus,
      setFileStatus: (status: IFileStatusGroup) => {
        saveOpenFileStatus(status);
      }
    }),
    [
      headerCollapsed,
      propsCollapsed,
      componentCollapsed,
      preview,
      resourceTree,
      fileStatus
    ]
  );

  const [allShow, setAllShow] = useState(
    localStorage.ideHeaderCollapse === "false"
  );
  const hideAll = useCallback(() => {
    toggleComponentCollapse(true);
    togglePropsCollapse(true);
    toggleHeaderCollapse(true);
    setAllShow(false);
  }, [allShow]);

  const showAll = useCallback(() => {
    toggleComponentCollapse(false);
    togglePropsCollapse(false);
    toggleHeaderCollapse(false);
    setAllShow(true);
  }, [allShow]);

  // file save window
  const [visible, changeVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const searchNode = useCallback(
    (file: string, nodeTree: IResourceTreeNode): any => {
      let node = {} as IResourceTreeNode;
      if (nodeTree && _.isObject(nodeTree)) {
        if (nodeTree.key === file) {
          node = nodeTree;
        } else if (nodeTree.children && nodeTree.children.length) {
          nodeTree.children.forEach((item: IResourceTreeNode) => {
            let findNode = searchNode(file, item);
            if (!_.isEmpty(findNode)) {
              node = findNode;
            }
          });
        }
      }
      return node;
    },
    []
  );
  const removeNodeFromResourceTree = useCallback(
    (file: string, type: string) => {
      let data: IResourceTreeNode;
      let updatedTree: any = _.clone(resourceTree);
      if (type === "schema") {
        data = _.get(updatedTree, `${type}[1]`);
      } else {
        data = _.get(updatedTree, type);
      }
      let targetNode = searchNode(file, data);
      const srcNodes = _.get(targetNode, `_parent_.children`, []);
      _.remove(srcNodes, (d: any) => {
        return d.key === targetNode.key;
      });
      setResourceTree(updatedTree);
    },
    []
  );
  const handleOk = useCallback(() => {
    // save files using sockets
    const fileLoader = FileLoader.getInstance();
    files.forEach(async (statusNode: IUploadFile) => {
      const { path, type, status } = statusNode;
      if (
        status &&
        (status.status === "removed" || status.status === "renamed")
      ) {
        await saveFile(statusNode);
        // update file status
        fileLoader.removeFile(path, type);
      } else {
        let data = await fileLoader.loadFile(path, type);
        if (type === "schema") data = cleanSchema(data);
        if (data.children) {
          data.children.forEach(async (child: any) => {
            if (child.$template) {
              let templateData = await fileLoader.loadFile(
                child.$template,
                "schema"
              );
              templateData = cleanSchema(templateData);
              let templateStatusNode = {} as IUploadFile;
              templateStatusNode.data = templateData;
              templateStatusNode.path = child.$template;
              templateStatusNode.type = "schema";
              templateStatusNode.status = { status: "new", nodeType: "file" };
              // save templates
              await saveFile(templateStatusNode);
              // update template status
              saveFileStatus(child.$template, "schema", "dropped");
            }
          });
        }
        statusNode.data = data;
        await saveFile(statusNode);
      }
      // update file status
      let updatedStatus = _.cloneDeep(status);
      updatedStatus.status = "dropped";
      saveOpenFileStatus({ file: path, type, status: updatedStatus });
      // remove node from resource tree
      removeNodeFromResourceTree(path, type);
      toggleRefresh();
    });
    changeVisible(false);
  }, [files]);

  const handleCancel = useCallback((e: any) => {
    changeVisible(false);
  }, []);

  const onCheckFiles = useCallback((files: any) => {
    console.log(files, "files...");
    setFiles(files);
  }, []);

  const switchPreviewMode = useCallback(
    e => {
      e.preventDefault();
      switchPreview(!preview);
    },
    [preview]
  );

  const showPropWindow = useCallback(
    e => {
      e.preventDefault();
      togglePropsCollapse(!propsCollapsed);
    },
    [propsCollapsed]
  );

  // add shortcut:h
  const toggleShowAll = useCallback(
    e => {
      e.preventDefault();
      if (allShow) {
        hideAll();
      } else {
        showAll();
      }
    },
    [allShow]
  );

  const showSaveWindow = useCallback((e: any) => {
    if (e) e.preventDefault();
    changeVisible(true);
  }, []);

  // shortcuts
  // shortcut v == preview, a=attribute
  useEffect(() => {
    const shortcutManger = ShortcutManager.getInstance();
    const shortcuts = {
      ctrlP: switchPreviewMode,
      ctrlQ: showPropWindow,
      ctrlH: toggleShowAll,
      ctrlS: showSaveWindow
    };
    shortcutManger.register(shortcuts);
  }, [allShow, preview, propsCollapsed]);

  const [isOverHeader, setIsOverHeader] = useState(false);
  useEffect(() => {
    const ideEditor: any = document.getElementById("ide-editor");
    if (headerCollapsed) {
      ideEditor.style.height = "100%";
    } else {
      ideEditor.style.height = "calc(100% - 60px)";
    }

    // component mouse over
    const designManager: any = document.getElementById("ide-design-header");
    designManager.onmouseover = () => {
      setIsOverHeader(true);
    };

    designManager.onmouseout = () => {
      setIsOverHeader(false);
    };
  }, [isOverHeader, headerCollapsed, preview, propsCollapsed, allShow]);

  const cls = classnames({
    "ide-header": true,
    hidden: headerCollapsed,
    over: isOverHeader
  });

  return (
    <GlobalContext.Provider value={contextValue}>
      {headerCollapsed ? (
        <a className="ide-show" title="shortcut: ctrl+h" onClick={showAll}>
          <Icon type="caret-right" />
        </a>
      ) : null}
      <div className={cls} id="ide-design-header">
        <div className="left">
          <div className="button-close" title="shortcut: ctrl+h">
            <Icon type="close" onClick={hideAll} />
          </div>
          <SchemasContext.Consumer>
            {({ savedTime, editingResource }) => (
              <>
                <a
                  className="button-menu"
                  onClick={() => toggleComponentCollapse(!componentCollapsed)}
                >
                  <Icon type="menu" /> Editing{" "}
                  {_.get(editingResource, "title", "...")}
                </a>
                {savedTime ? (
                  <div className="page-name">
                    <em>(Last Saved: {savedTime})</em>
                  </div>
                ) : null}
                <Modal
                  title="Choose Saving Files"
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <StagingFileTree onChange={onCheckFiles} refresh={refresh} />
                </Modal>
              </>
            )}
          </SchemasContext.Consumer>
        </div>
        <div className="right">
          <div className="props">
            <Switch
              title="shortcut: ctrl+p"
              checked={preview}
              checkedChildren="Preview"
              unCheckedChildren="Edit"
              onChange={() => switchPreview(!preview)}
            />
            <a
              title="shortcut: ctrl+q"
              className="settings"
              onClick={() => togglePropsCollapse(!propsCollapsed)}
            >
              <Icon type="setting" />
            </a>
            <a
              className="save"
              title="shortcut: ctrl+s"
              onClick={showSaveWindow}
            >
              <Icon type="save" />
            </a>
          </div>

          <div className="brand">
            <img src="logo.png" alt="UIEngine" height="24" />
          </div>
        </div>
      </div>

      {props.children}
    </GlobalContext.Provider>
  );
};
