import React from "react";
import _ from "lodash";
import { Title } from "./Title";

import { Tree } from "antd";
import { getFileSuffix } from "../../../../helpers";

const { TreeNode } = Tree;

const intialItems = (node: IResourceTreeNode, parent: IResourceTreeNode) => {
  const suffix = getFileSuffix(node);
  const regExp = new RegExp(`${suffix}$`);

  node._parent_ = parent;
  let path = node.name;
  if (_.has(parent, "_path_") && parent.nodeType !== "root") {
    const p = parent._path_.replace(regExp, "");
    path = `${p}/${node.name}`;
  }

  node._path_ = path;
  node._key_ = node._key_ || node._path_;
};

export const renderTreeNodes = (
  treeNodes: Array<IResourceTreeNode>,
  props: any,
  parent: any = null
) => {
  return treeNodes
    ? treeNodes.map((item: any) => {
        const title = item.title || item.name;
        // to improve performance, this is not about Nodes itself
        intialItems(item, parent);

        if (item.children) {
          return (
            <TreeNode
              isLeaf={item.nodeType === "file"}
              title={
                <Title dataRef={item} {...props}>
                  {title}
                </Title>
              }
              key={item._key_}
              dataRef={item}
            >
              {renderTreeNodes(item.children, props, item)}
              {/* <Nodes treeNodes={item.children} parent={item} {...props} /> */}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            isLeaf={item.nodeType === "file"}
            title={
              <Title dataRef={item} {...props}>
                {title}
              </Title>
            }
            key={item._key_}
            dataRef={item}
          />
        );
      })
    : null;
};
