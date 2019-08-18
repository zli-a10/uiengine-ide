import React from "react";

import "./InsertTarget";
import { TreeViewItemList } from "./Node";

export const TreeView: React.Factory<TreeViewProps> = (props: any) => (
  <div className={props.classNames.treeView}>
    <TreeViewItemList
      parentNode={{} as TreeNode}
      nodes={props.rootNodes}
      renderNode={props.renderNode}
      classNames={props.classNames}
      onMoveNode={props.onMoveNode}
    />
  </div>
);
