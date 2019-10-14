import React, { useState, useContext, useCallback } from "react";
import _ from "lodash";
import { Tree } from "antd";
import { renderTreeNodes } from "./renderTreeNodes";
import { SchemasContext, IDEEditorContext } from "../../../Context";
import { loadFileAndRefresh } from "../../../../helpers";

export const TreeBase = (props: any) => {
  const { selectedKeys, setSelectedKey } = useContext(SchemasContext);
  const { setContent } = useContext(IDEEditorContext);
  const { tree, openKeys } = props;
  const [expandKeys, setExpandKeys] = useState<string[]>(openKeys);
  const [autoExpandParent, setAutoExpandParent] = useState(false);
  const onExpand = useCallback((expandKeys: string[]) => {
    setExpandKeys(expandKeys);
    setAutoExpandParent(false);
  }, []);

  const [refresh, setRefresh] = useState(Date.now());
  const onRefresh = useCallback(() => {
    setRefresh(Date.now());
  }, []);

  let defaultExpandedKeys: any = [];

  const onSelect = useCallback((keys: string[], treeNode?: any) => {
    if (!_.has(treeNode, "node.props.dataRef._editing_")) {
      const dataRef = _.get(treeNode, "node.props.dataRef");
      const type = _.get(dataRef, "type", "schema");
      const isTemplate = _.get(dataRef, "isTemplate", false);
      if (keys.length) {
        const promise = loadFileAndRefresh(keys[0], type, isTemplate);
        promise.then((data: any) => {
          setContent(data);
        });
      }
      setSelectedKey(keys, dataRef);
    }
  }, []);

  const followProps = {
    onSelect,
    onExpandKeys: setExpandKeys,
    onAutoExpandParent: setAutoExpandParent,
    onRefresh: onRefresh,
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
