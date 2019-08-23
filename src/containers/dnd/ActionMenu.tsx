import React, { useCallback } from "react";
import { Menu, Dropdown, Icon } from "antd";
import DndNodeManager from "./DndNodeManager";
const dndNodeManager = DndNodeManager.getInstance();

const ActionMenu = (props: any) => {
  const { children, uinode } = props;
  // const {SubMenu} = Menu;
  const deleteNode = useCallback(
    async (e: any) => {
      await dndNodeManager.delete(uinode);
    },
    [uinode]
  );

  const unWrapNode = useCallback(
    async (e: any) => {
      await dndNodeManager.removeWrappers(uinode);
    },
    [uinode]
  );

  const menu = (
    <Menu>
      {/* <Menu.Item key="unit-child">
      <a target="_blank">
        <Icon type="enter" /> Add Child Row
      </a>
    </Menu.Item>
    <Menu.Item key="unit-up">
      <a target="_blank">
        <Icon type="arrow-up" /> Add Up Row
      </a>
    </Menu.Item>
    <Menu.Item key="unit-down">
      <a target="_blank">
        <Icon type="arrow-down" /> Add Down Row
      </a>
    </Menu.Item>
    <Menu.Item key="unit-left">
      <a target="_blank">
        <Icon type="arrow-left" /> Add Left Col
      </a>
    </Menu.Item>
    <Menu.Item key="unit-right">
      <a target="_blank">
        <Icon type="arrow-right" /> Add Right Col
      </a>
    </Menu.Item> */}
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
      {/* <Menu.Item key="unit-edit">
      <a target="_blank">
        <Icon type="edit" /> Edit
      </a>
    </Menu.Item> */}
    </Menu>
  );

  return <Dropdown overlay={menu}>{children}</Dropdown>;
};

export default ActionMenu;
