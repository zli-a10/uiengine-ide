import React, { useMemo, useCallback, useContext } from "react";
import _ from "lodash";

import { Menu } from "antd";
import { resourceActions } from "../../../../helpers";
import { IDEEditorContext } from "../../../Context";

export const ActionMenu = (props: any) => {
  const {
    status,
    expandKeys = [],
    dataRef,
    onSelect,
    onExpandKeys,
    onAutoExpandParent,
    onRefresh
  } = props;

  const { removeTab, setContent, tabs } = useContext(IDEEditorContext);

  const actionmMap: any = useMemo(
    () => ({
      add: () => {
        resourceActions.add(dataRef);
        if (expandKeys.indexOf(dataRef.key) === -1) {
          expandKeys.push(dataRef.key);
        }
        // console.log(expandKeys, dataRef);
        onExpandKeys(_.cloneDeep(expandKeys));
        onAutoExpandParent(true);
      },
      addFolder: () => {
        console.log("add folder");
        resourceActions.addFolder(dataRef);
        if (expandKeys.indexOf(dataRef.key) === -1) {
          expandKeys.push(dataRef.key);
        }
        onExpandKeys(_.cloneDeep(expandKeys));
        onAutoExpandParent(true);
      },
      delete: () => {
        resourceActions.delete(dataRef);
        // const selectedKeys = [_.get(dataRef, "_parent_._key_", "root")];
        // onSelect(selectedKeys);
        removeTab(dataRef.key)
        onRefresh();
      },
      undelete: () => {
        resourceActions.delete(dataRef, true);
        onRefresh();
      },
      clone: () => {
        const data = resourceActions.clone(dataRef);
        data.then((newNode: IResourceTreeNode) => {
          onSelect([newNode.name], newNode);
          onRefresh();
        })
      },
      rename: () => {
        dataRef._editing_ = "rename";
        onRefresh();
      },
      revert: () => {
        const data = resourceActions.revert(dataRef);
        data.then((content) => {
          if (_.find(tabs, { tab: dataRef.key })) {
            setContent({ content: JSON.stringify(content, null, '\t'), type: 'schema', file: dataRef.key });
          }
        })
        onRefresh();
      },
    }),
    [dataRef, expandKeys, status, removeTab]
  );

  const onClick = useCallback(
    (e: any) => {
      e.domEvent.stopPropagation();
      const actionName = e.key;
      return actionmMap[actionName].call();
    },
    [dataRef, removeTab, setContent, tabs]
  );

  const isFolder = dataRef.nodeType === "folder" || dataRef.nodeType === "root";
  return (
    <Menu onClick={onClick}>
      {status !== "removed" && isFolder ? (
        <Menu.Item key="add">
          <a>Add File</a>
        </Menu.Item>
      ) : null}
      {status !== "removed" && isFolder ? (
        <Menu.Item key="addFolder">
          <a>Add Folder</a>
        </Menu.Item>
      ) : null}
      {dataRef.nodeType === "root" ? null : status !== "removed" ? (
        <Menu.Item key="delete">
          <a>Delete</a>
        </Menu.Item>
      ) : (
          <Menu.Item key="undelete">
            <a>Undelete</a>
          </Menu.Item>
        )}
      {isFolder ? null : (
        <Menu.Item key="clone">
          <a>Clone</a>
        </Menu.Item>
      )}
      {dataRef.nodeType !== "root" && status !== "removed" ? (
        <Menu.Item key="rename">
          <a>Rename</a>
        </Menu.Item>
      ) : null}
      {status == "changed" && !isFolder ? (
        <Menu.Item key="revert">
          <a>Revert</a>
        </Menu.Item>
      ) : null}
    </Menu>
  );
};
