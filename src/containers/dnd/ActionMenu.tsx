import React, { useCallback, useContext } from "react";
import _ from "lodash";
import { Menu, Dropdown, Icon } from "antd";
import { DndNodeManager, getActiveUINode, cloneUINode } from "../../helpers";
const dndNodeManager = DndNodeManager.getInstance();
import { SchemasContext, IDEEditorContext } from "../Context";
import { UINode } from "uiengine";
import { IDE_ID } from "../../helpers";

const ActionMenu = (props: any) => {
  const { updateSchema } = useContext(SchemasContext);
  const {
    focusMode = {} as any,
    collapsedNodes,
    setCollapsedNode
  } = useContext(IDEEditorContext);

  const { children, uinode } = props;
  // const [isFocus, setFocus] = useState(false)
  const { isFocus, topSchema } = focusMode;
  // const {SubMenu} = Menu;
  const deleteNode = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation();
      await dndNodeManager.delete(uinode);
      updateSchema(uinode.schema);
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
      // await dndNodeManager.removeWrappers(uinode)
      // updateInfo({ schema: uinode.schema })
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
      <Menu.Item key="unit-save-as-template" onClick={saveTemplate}>
        <a target="_blank">
          <Icon type="save" /> Save as Template
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="unit-unwrapper" onClick={unWrapNode}>
        <a target="_blank">
          <Icon type="menu-fold" /> Remove Layout Wrappers
        </a>
      </Menu.Item>
      <Menu.Item key="unit-delete" onClick={deleteNode}>
        <a target="_blank">
          <Icon type="delete" /> Delete
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
