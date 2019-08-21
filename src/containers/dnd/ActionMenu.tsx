import React from "react";
import { Menu, Dropdown, Icon } from "antd";
// const {SubMenu} = Menu;

const menu = (
  <Menu>
    <Menu.Item key="unit-child">
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
    </Menu.Item>
    <Menu.Item key="unit-unwrapper">
      <a target="_blank">
        <Icon type="menu-fold" />
        Remove Redundant Wrappers
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="unit-delete">
      <a target="_blank">
        <Icon type="delete" /> Delete
      </a>
    </Menu.Item>
    <Menu.Item key="unit-edit">
      <a target="_blank">
        <Icon type="edit" /> Edit
      </a>
    </Menu.Item>
  </Menu>
);

const ActionMenu = (props: any) => {
  const { children } = props;
  return <Dropdown overlay={menu}>{children}</Dropdown>;
};

export default ActionMenu;
