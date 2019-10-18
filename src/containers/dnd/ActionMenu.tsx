import React, { useContext } from "react";
import _ from "lodash";
import { Menu, Dropdown, Icon } from "antd";

import { GlobalContext, IDEEditorContext, SchemasContext } from "../Context";
import {
  IDE_ID,
  useDeleteNode,
  useUnWrapNode,
  useRemoveChildren,
  useSaveTemplate,
  useCollapseItems,
  useCloneNode
} from "../../helpers";

const ActionMenu = (props: any) => {
  const { editingResource } = useContext(SchemasContext);
  const { collapsedNodes } = useContext(IDEEditorContext);
  const { children, uinode } = props;

  const menu = (
    <Menu>
      <Menu.Item key="unit-collapse" onClick={useCollapseItems(uinode)}>
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
      {!editingResource ? null : (
        <Menu.Item
          key="unit-save-as-template"
          onClick={useSaveTemplate(uinode)}
        >
          <a target="_blank">
            <Icon type="save" /> Save as Template
          </a>
        </Menu.Item>
      )}

      <Menu.Divider />
      <Menu.Item key="unit-remove-all" onClick={useRemoveChildren(uinode)}>
        <a target="_blank">
          <Icon type="stop" /> Clear Layout
        </a>
      </Menu.Item>
      <Menu.Item key="unit-unwrapper" onClick={useUnWrapNode(uinode)}>
        <a target="_blank">
          <Icon type="menu-fold" /> Remove Layout Wrappers
        </a>
      </Menu.Item>
      <Menu.Item key="unit-delete" onClick={useDeleteNode(uinode)}>
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
        <Menu.Item key="unit-clone-left" onClick={useCloneNode(uinode)("left")}>
          <a target="_blank">
            <Icon type="left" /> Clone to Left [^L]
          </a>
        </Menu.Item>
        <Menu.Item
          key="unit-clone-right"
          onClick={useCloneNode(uinode)("right")}
        >
          <a target="_blank">
            <Icon type="right" /> Clone to Right [^R]
          </a>
        </Menu.Item>
        <Menu.Item key="unit-clone-up" onClick={useCloneNode(uinode)("up")}>
          <a target="_blank">
            <Icon type="up" /> Clone to Up [^U]
          </a>
        </Menu.Item>
        <Menu.Item key="unit-clone-down" onClick={useCloneNode(uinode)("down")}>
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
