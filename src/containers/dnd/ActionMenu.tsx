import React, { useCallback, useContext } from "react";
import { Menu, Dropdown, Icon } from "antd";
import DndNodeManager from "./DndNodeManager";
const dndNodeManager = DndNodeManager.getInstance();
import { Context } from "../editor/Context";

const ActionMenu = (props: any) => {
  const { updateInfo } = useContext(Context);
  const { children, uinode } = props;
  // const {SubMenu} = Menu;
  const deleteNode = useCallback(
    async (e: any) => {
      await dndNodeManager.delete(uinode);
      updateInfo({ schema: uinode.schema });
    },
    [uinode]
  );

  const unWrapNode = useCallback(
    async (e: any) => {
      await dndNodeManager.removeWrappers(uinode);
      updateInfo({ schema: uinode.schema });
    },
    [uinode]
  );

  const menu = (
    <Menu>
      <Menu.Item key="unit-unwrapper" onClick={unWrapNode}>
        <a target="_blank">
          <Icon type="menu-fold" />
          Remove Layout Wrappers
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="unit-delete" onClick={deleteNode}>
        <a target="_blank">
          <Icon type="delete" /> Delete
        </a>
      </Menu.Item>
    </Menu>
  );

  return <Dropdown overlay={menu}>{children}</Dropdown>;
};

export default ActionMenu;
