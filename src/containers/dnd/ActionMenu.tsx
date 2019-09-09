import React, { useCallback, useContext } from "react";
import _ from "lodash";
import { Menu, Dropdown, Icon } from "antd";
import {
  DndNodeManager,
  getActiveUINode,
  cloneUINode,
  FileLoader
} from "../../helpers";
const dndNodeManager = DndNodeManager.getInstance();
import { SchemasContext, IDEEditorContext } from "../Context";
import { UINode } from "uiengine";
import { IDE_ID, getTreeRoot } from "../../helpers";

const ActionMenu = (props: any) => {
  const { updateSchema, currentData, setSelectedKey } = useContext(
    SchemasContext
  );
  const {
    focusMode = {} as any,
    collapsedNodes,
    setCollapsedNode,
    chooseEditNode
  } = useContext(IDEEditorContext);

  const { children, uinode } = props;
  // const [isFocus, setFocus] = useState(false)
  const { isFocus, topSchema } = focusMode;
  // const {SubMenu} = Menu;
  const deleteNode = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation();
      await dndNodeManager.delete(uinode);
      // to show schema corret on prop window
      updateSchema(uinode.schema);
      chooseEditNode(null);
    },
    [uinode]
  );

  const unWrapNode = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation();
      await dndNodeManager.removeWrappers(uinode);
      updateSchema(uinode.schema);
    },
    [uinode]
  );

  const removeChildren = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation();
      await dndNodeManager.cleanLayout(uinode);
      updateSchema(uinode.schema);
    },
    [uinode]
  );

  const focusCurrent = async (e: any) => {
    const currentIsFocus = !isFocus;
    // setFocus(currentIsFocus)
    // updateFocusMode({
    //   isFocus: currentIsFocus,
    //   topSchema: currentIsFocus ? _.cloneDeep(getActiveUINode(true)) : undefined
    // });
    e.domEvent.stopPropagation();
    const rootNode = getActiveUINode();
    if (rootNode instanceof UINode) {
      rootNode.schema = currentIsFocus ? uinode.schema : topSchema;
      await rootNode.updateLayout();
      rootNode.sendMessage(true);
    }
  };

  const saveTemplate = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation();
      if (!currentData) return;
      const fileLoader = FileLoader.getInstance();
      const schema = uinode.schema;

      // save file
      const name = _.uniqueId("saved_template_");
      const newPath = `${_.get(currentData, "_path_")}/${name}`;

      // and update the tree
      const children = _.get(currentData, "children", []);
      children.push({
        _path_: newPath,
        _key_: newPath,
        name,
        title: name,
        _editing_: true
      });
      currentData.children = children;
      const treeRoot = getTreeRoot(currentData);
      // console.log(newPath, schema, treeRoot, "...............");
      fileLoader.saveFile(newPath, schema, "schema", treeRoot);

      // refresh the tree
      setSelectedKey(newPath);
    },
    [uinode]
  );

  const collapseItems = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation();
      setCollapsedNode(uinode);
    },
    [uinode]
  );

  const cloneNode = useCallback(
    (pos: string) => {
      return async (e: any) => {
        e.domEvent.stopPropagation();
        await cloneUINode(uinode, pos);
      };
    },
    [uinode]
  );
  const menu = (
    <Menu>
      {/* <Menu.Item key="unit-focus" onClick={focusCurrent}>
        {isFocus ? (
          <a target="_blank">
            <Icon type="border-outer" />
            Blur
          </a>
        ) : (
          <a target="_blank">
            <Icon type="border-inner" />
            Focus
          </a>
        )}
      </Menu.Item> */}
      <Menu.Item key="unit-collapse" onClick={collapseItems}>
        {collapsedNodes.indexOf(_.get(uinode, `schema.${IDE_ID}`, "**any-id")) >
        -1 ? (
          <a target="_blank">
            <Icon type="fullscreen" /> Expand Items
          </a>
        ) : (
          <a target="_blank">
            <Icon type="fullscreen-exit" /> Collapse Items
          </a>
        )}
      </Menu.Item>
      {!currentData ? null : (
        <Menu.Item key="unit-save-as-template" onClick={saveTemplate}>
          <a target="_blank">
            <Icon type="save" /> Save as Template
          </a>
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item key="unit-remove-all" onClick={removeChildren}>
        <a target="_blank">
          <Icon type="stop" /> Clear Layout
        </a>
      </Menu.Item>
      <Menu.Item key="unit-unwrapper" onClick={unWrapNode}>
        <a target="_blank">
          <Icon type="menu-fold" /> Remove Layout Wrappers
        </a>
      </Menu.Item>
      <Menu.Item key="unit-delete" onClick={deleteNode}>
        <a target="_blank">
          <Icon type="delete" /> Delete [D|Delete]
        </a>
      </Menu.Item>
      <Menu.SubMenu
        key="clone-to-pos"
        title={
          <span>
            <Icon type="copy" />
            <span>Clone</span>
          </span>
        }
      >
        <Menu.Item key="unit-clone-left" onClick={cloneNode("left")}>
          <a target="_blank">
            <Icon type="left" /> Clone to Left [^L]
          </a>
        </Menu.Item>
        <Menu.Item key="unit-clone-right" onClick={cloneNode("right")}>
          <a target="_blank">
            <Icon type="right" /> Clone to Right [^R]
          </a>
        </Menu.Item>
        <Menu.Item key="unit-clone-up" onClick={cloneNode("up")}>
          <a target="_blank">
            <Icon type="up" /> Clone to Up [^U]
          </a>
        </Menu.Item>
        <Menu.Item key="unit-clone-down" onClick={cloneNode("down")}>
          <a target="_blank">
            <Icon type="down" /> Clone to Down [^D]
          </a>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return <Dropdown overlay={menu}>{children}</Dropdown>;
};

export default ActionMenu;
