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

        onExpandKeys(_.cloneDeep(expandKeys));
        onAutoExpandParent(true);
      },
      delete: () => {
        resourceActions.delete(dataRef);
        const selectedKeys = [_.get(dataRef, "_parent_._key_", "root")];
        onSelect(selectedKeys);
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

  const onClick = useCallback((e: any) => {
    const actionName = e.key;
    return actionmMap[actionName].call();
  }, []);

  return (
    <Menu onClick={onClick}>
      {status !== "removed" ? (
        <Menu.Item key="add">
          <a>Add</a>
        </Menu.Item>
      ) : null}
      {status !== "removed" ? (
        <Menu.Item key="delete">
          <a>Delete</a>
        </Menu.Item>
      ) : (
        <Menu.Item key="undelete">
          <a>Undelete</a>
        </Menu.Item>
      )}
      <Menu.Item key="clone">
        <a>Clone</a>
      </Menu.Item>
      {status !== "removed" ? (
        <Menu.Item key="rename">
          <a>Rename</a>
        </Menu.Item>
      ) : null}
    </Menu>
  );
};
