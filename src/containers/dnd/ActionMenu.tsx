import React, { useContext, useState, useCallback, useEffect } from "react";
import _ from "lodash";
import {
  Menu,
  Dropdown,
  Icon,
  TreeSelect,
  Col,
  Row,
  Button,
  Input
} from "antd";
const ButtonGroup = Button.Group;

import { GlobalContext, IDEEditorContext, SchemasContext } from "../Context";
import {
  IDE_ID,
  useDeleteNode,
  useUnWrapNode,
  useRemoveChildren,
  useSaveTemplate,
  useBreakupFromTemplate,
  useCollapseItems,
  useCloneNode,
  useCreateNode,
  IDERegister
  // DndNodeManager
} from "../../helpers";

const ActionMenu = (props: any) => {
  const { togglePropsCollapsed } = useContext(GlobalContext);
  const { editingResource } = useContext(SchemasContext);
  const { collapsedNodes, chooseEditNode } = useContext(IDEEditorContext);
  const { children, uinode } = props;
  const isTemplate = _.has(uinode, "props.ide_droppable");

  const componentInfo = IDERegister.getComponentInfo(uinode.schema.component);
  const isContainer = _.get(componentInfo, "isContainer");

  const [treeValue, selectTreeValue] = useState("div");
  useEffect(() => {
    const component = _.get(uinode, "schema.component");
    selectTreeValue(component);
  }, [uinode]);

  const onTreeChange = useCallback(
    (value: any, label: any, extra: any) => {
      if (value && value.indexOf("component-category-") === -1) {
        selectTreeValue(value);
      }
    },
    [treeValue, uinode]
  );

  const onShowPropmanager = useCallback(() => {
    chooseEditNode(uinode);
    // console.log(uinode);
    togglePropsCollapsed(false);
  }, [uinode, chooseEditNode]);

  const treeData = IDERegister.componentsLibrary;

  const menu = (
    <Menu>
      <Menu.Item
        key="create-element-inplace"
        onClick={({ domEvent }) => {
          // console.log(e);
          domEvent.stopPropagation();
          return false;
        }}
      >
        <Row onClick={(e: any) => e.stopPropagation()}>
          <Col span={12}>
            <TreeSelect
              showSearch
              className={"component-select"}
              value={treeValue}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeData={treeData}
              placeholder={"Search and Append Node"}
              onChange={onTreeChange}
            />
          </Col>
          <Col span={12}>
            <ButtonGroup>
              <Button
                size="small"
                icon="down"
                onClick={useCreateNode(
                  { component: treeValue },
                  uinode
                )("down")}
              />

              <Button
                size="small"
                icon="up"
                onClick={useCreateNode({ component: treeValue }, uinode)("up")}
              />
              {isContainer === false ? null : (
                <Button
                  type="primary"
                  size="small"
                  icon="plus"
                  onClick={useCreateNode(
                    { component: treeValue },
                    uinode
                  )("center")}
                />
              )}
              <Button
                size="small"
                icon="left"
                onClick={useCreateNode(
                  { component: treeValue },
                  uinode
                )("left")}
              />
              <Button
                size="small"
                icon="right"
                onClick={useCreateNode(
                  { component: treeValue },
                  uinode
                )("right")}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Menu.Item>
      {/* <Menu.Item
        key="test"
        onClick={({ domEvent }) => {
          // console.log(e);
          domEvent.stopPropagation();
          domEvent.preventDefault();
          return false;
        }}
        onKeyPress={(e: any) => {
          e.preventDefault();
        }}
        onKeyDown={(e: any) => {
          e.preventDefault();
        }}
        onKeyUp={(e: any) => {
          e.preventDefault();
        }}
      >
        <input
          onClick={(e: any) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onKeyPress={(e: any) => {
            e.stopPropagation();
          }}
          onKeyDown={(e: any) => {
            e.stopPropagation();
          }}
          onKeyUp={(e: any) => {
            e.stopPropagation();
          }}
        />
      </Menu.Item> */}
      <Menu.Divider />

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
      {!editingResource || isTemplate ? null : (
        <Menu.Item
          key="unit-save-as-template"
          onClick={useSaveTemplate(uinode)}
        >
          <a target="_blank">
            <Icon type="save" /> Save as Template
          </a>
        </Menu.Item>
      )}
      {isTemplate ? (
        <Menu.Item
          key="unit-break-from-template"
          onClick={useBreakupFromTemplate(uinode)}
        >
          <a target="_blank">
            <Icon type="save" /> Breakup from Template
          </a>
        </Menu.Item>
      ) : null}
      <Menu.Divider />
      <Menu.Item key="unit-remove-all" onClick={useRemoveChildren(uinode)}>
        <a target="_blank">
          <Icon type="stop" /> Clear Layout
        </a>
      </Menu.Item>
      {isContainer ? (
        <Menu.Item key="unit-unwrapper" onClick={useUnWrapNode(uinode)}>
          <a target="_blank">
            <Icon type="menu-fold" /> Remove Layout Wrappers
          </a>
        </Menu.Item>
      ) : null}
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
      <Menu.Divider />
      <Menu.Item key="show-prop-window" onClick={onShowPropmanager}>
        <a target="_blank">
          <Icon type="setting" /> Properties... [^Q]
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlayClassName="component-context-menu"
      overlay={menu}
      trigger={["contextMenu"]}
    >
      {children}
    </Dropdown>
  );
};

export default ActionMenu;
