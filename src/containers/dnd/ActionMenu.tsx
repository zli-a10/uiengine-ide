import React, { useCallback, useContext, useState, useMemo } from "react";
import _ from "lodash";
import { Menu, Dropdown, Icon } from "antd";
import { DndNodeManager, getActiveUINode } from "../../helpers";
const dndNodeManager = DndNodeManager.getInstance();
import { Context } from "../editor/Context";
import { UINode } from "uiengine";

const ActionMenu = (props: any) => {
  const {
    updateInfo,
    info: { focusedSchema }
  } = useContext(Context);
  const { children, uinode } = props;
  // const {SubMenu} = Menu;
  const deleteNode = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation();
      await dndNodeManager.delete(uinode);
      updateInfo({ schema: uinode.schema });
    },
    [uinode]
  );

  const unWrapNode = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation();
      await dndNodeManager.removeWrappers(uinode);
      updateInfo({ schema: uinode.schema });
    },
    [uinode]
  );

  // const topSchema = useMemo(() => _.cloneDeep(getActiveUINode(true)), [true]);
  // let focus = focusedSchema && !_.isEqual(topSchema, focusedSchema);
  let focus = false;
  const focusCurrent = async (e: any) => {
    e.domEvent.stopPropagation();
    const rootNode = getActiveUINode();
    // await dndNodeManager.useSchema(rootNode, editSchema);
    // if (rootNode instanceof UINode) {
    //   // console.log(focusedSchema, "..........");
    //   rootNode.schema = focus ? topSchema : uinode.schema;
    //   await rootNode.updateLayout();
    //   rootNode.sendMessage(true);
    // }
    // if (!focus) {
    //   updateInfo({
    //     focusedSchema: topSchema,
    //     storedSchema: uinode.schema
    //   });
    // } else {
    //   updateInfo({
    //     focusedSchema: uinode.schema,
    //     storedSchema: topSchema
    //   });
    // }
  };

  const menu = (
    <Menu>
      <Menu.Item key="unit-focus" onClick={focusCurrent}>
        {focus ? (
          <a target="_blank">
            <Icon type="border-outer" />
            Exit Focus
          </a>
        ) : (
          <a target="_blank">
            <Icon type="border-inner" />
            Focus
          </a>
        )}
      </Menu.Item>
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
