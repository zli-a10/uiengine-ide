import React, { useState, useContext, useCallback } from "react";
import _ from "lodash";
import { Tree } from "antd";
import { renderTreeNodes } from "./renderTreeNodes";
import { SchemasContext } from "../../../Context";

export const TreeBase = (props: any) => {
  const { selectedKeys, setSelectedKey } = useContext(SchemasContext);
  const { tree, type } = props;
  const [expandKeys, setExpandKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(false);
  const onExpand = useCallback((expandKeys: string[]) => {
    setExpandKeys(expandKeys);
    setAutoExpandParent(false);
  }, []);

  const [refresh, setRefresh] = useState(Date.now());

  let defaultExpandedKeys: any = [];

  const onSelect = (keys: string[], treeNode?: any) => {
    setSelectedKey(keys, treeNode, type);
  };

  const followProps = {
    onExpandKeys: setExpandKeys,
    onAutoExpandParent: setAutoExpandParent,
    onRefresh: setRefresh,
    expandKeys: expandKeys
  };

  return (
    <div className="pagetree">
      <Tree
        showLine
        onExpand={onExpand}
        onSelect={onSelect}
        autoExpandParent={autoExpandParent}
        defaultExpandedKeys={defaultExpandedKeys}
        expandedKeys={expandKeys}
        selectedKeys={selectedKeys}
      >
        {renderTreeNodes(tree, followProps)}
      </Tree>
    </div>
  );
};
