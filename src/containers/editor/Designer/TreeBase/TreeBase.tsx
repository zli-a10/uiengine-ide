import React, { useState, useContext, useCallback } from "react";
import _ from "lodash";
import { Tree } from "antd";
import { renderTreeNodes } from "./renderTreeNodes";
import { SchemasContext, IDEEditorContext } from "../../../Context";
import { loadFileAndRefresh } from "../../../../helpers";

export const TreeBase = (props: any) => {
  const { selectedKeys, setSelectedKey, toggleRefresh } = useContext(
    SchemasContext
  );
  const { setContent, activeTab } = useContext(IDEEditorContext);
  const { tree, openKeys } = props;
  const [expandKeys, setExpandKeys] = useState<string[]>(openKeys);
  const [autoExpandParent, setAutoExpandParent] = useState(false);
  const onExpand = useCallback(
    (expandKeys: string[]) => {
      setExpandKeys(expandKeys);
      setAutoExpandParent(false);
    },
    [tree]
  );

  const onRefresh = useCallback(() => {
    toggleRefresh();
  }, []);

  let defaultExpandedKeys: any = [];

  const onSelect = useCallback(
    (keys: string[], treeNode?: any) => {
      const dataRef = _.get(treeNode, "node.props.dataRef");
      const type = _.get(dataRef, "type", "schema");
      const nodeType = _.get(dataRef, "nodeType");
      const isTemplate = _.get(dataRef, "isTemplate", false);
      if (!_.has(treeNode, "node.props.dataRef._editing_")) {
        if (keys.length && nodeType === "file") {
          const promise = loadFileAndRefresh(keys[0], type, isTemplate);
          promise.then((data: any) => {
            setContent(data);
            if (type === "schema") {
              activeTab("drawingboard");
            } else {
              activeTab("codeeditor");
            }
          });
        }

        setSelectedKey(keys, dataRef);
      }
    },
    [tree]
  );

  const followProps = {
    onSelect,
    onExpandKeys: (keys: any) => {
      setExpandKeys(keys);
    },
    onAutoExpandParent: setAutoExpandParent,
    onRefresh: onRefresh,
    expandKeys: expandKeys
  };

  return (
    <div className="pagetree">
      <Tree.DirectoryTree
        showLine
        onExpand={onExpand}
        onSelect={onSelect}
        autoExpandParent={autoExpandParent}
        defaultExpandedKeys={defaultExpandedKeys}
        expandedKeys={expandKeys}
        selectedKeys={selectedKeys}
      >
        {renderTreeNodes(tree, followProps)}
      </Tree.DirectoryTree>
    </div>
  );
};
