import React, { useMemo, useCallback } from "react";
import _ from "lodash";

import { Menu } from "antd";
import { resourceActions } from "../../../../helpers";

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

  const actionmMap: any = useMemo(
    () => ({
      add: () => {
        resourceActions.add(dataRef);
        if (expandKeys.indexOf(dataRef._key_) === -1) {
          expandKeys.push(dataRef._key_);
        }

        // console.log(expandKeys, dataRef);
        onExpandKeys(_.cloneDeep(expandKeys));
        onAutoExpandParent(true);
      },
      addFolder: () => {
        console.log("add folder");
        resourceActions.addFolder(dataRef);
        if (expandKeys.indexOf(dataRef._key_) === -1) {
          expandKeys.push(dataRef._key_);
        }
        onExpandKeys(_.cloneDeep(expandKeys));
        onAutoExpandParent(true);
      },
      delete: () => {
        resourceActions.delete(dataRef);
        // const selectedKeys = [_.get(dataRef, "_parent_._key_", "root")];
        // onSelect(selectedKeys);
        onRefresh();
      },
      undelete: () => {
        resourceActions.delete(dataRef, true);
      },
      clone: () => {
        const newName = resourceActions.clone(dataRef);
        const selectedKeys = [newName];
        onSelect(selectedKeys);
      },
      rename: () => {
        dataRef._editing_ = "rename";
        onRefresh();
      }
    }),
    [dataRef, expandKeys, status]
  );

  const onClick = useCallback(
    (e: any) => {
      e.domEvent.stopPropagation();
      const actionName = e.key;
      return actionmMap[actionName].call();
    },
    [dataRef]
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
    </Menu>
  );
};
