// import Immutable from "immutable";
// import React from "react";

type TreeNodeID = string;

interface TreeNode {
  readonly id: TreeNodeID;
  readonly isCollapsed?: boolean;
  readonly children?: TreeNodeList;
}

interface TreeNodeList {
  readonly items: Immutable.Iterable<number, TreeNode>;
}

interface MoveTreeNodeArgs {
  oldParentNode: TreeNode;
  oldParentChildIndex: number;
  oldPrecedingNode: TreeNode;
  node: TreeNode;
  newParentNode: TreeNode;
  newParentChildIndex: number;
  newPrecedingNode: TreeNode;
}

interface MoveTreeNode {
  (args: MoveTreeNodeArgs): void;
}

interface TreeViewClassNames {
  readonly treeView: string;
  readonly nodeList: string;
  readonly node: string;
  readonly nodePositioningWrapper: string;
  readonly nodeDragging: string;
  readonly nodeChildren: string;
}

interface TreeViewProps {
  readonly rootNodes: TreeNodeList;

  readonly classNames: TreeViewClassNames;

  readonly renderNode: (node: TreeNode) => JSX.Element;
  readonly onMoveNode: MoveTreeNode;
}

interface DraggedNode {
  node: TreeNode;
  allSourceIDs: Immutable.Set<TreeNodeID>;
  parentNode: TreeNode;
  parentChildIndex: number;
  precedingNode: TreeNode;
}

namespace NormalStyles {
  const insertTarget: React.CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    height: "1em",
    position: "absolute",
    zIndex: 1,
    display: "none"
  };

  const insertBeforeTarget: React.CSSProperties = {
    top: "-0.5em"
  };

  const insertAfterTarget: React.CSSProperties = {
    bottom: "-0.5em"
  };

  const insertTargetCanDrop: React.CSSProperties = {
    display: "flex"
  };

  const insertTargetDropping: React.CSSProperties = {};

  const insertTargetMarkerDropping: React.CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    height: "3px",
    borderRadius: "2px",
    background: "linear-gradient(90deg, gray, white)",
    alignSelf: "center"
  };
}

namespace DebugStyles {
  const insertTarget: React.CSSProperties = {
    opacity: 0.5
  };

  const insertTargetCanDrop: React.CSSProperties = {};

  const insertTargetDropping: React.CSSProperties = {
    opacity: 0.9
  };

  const insertBeforeTarget: React.CSSProperties = {
    backgroundColor: "#ffffdd"
  };

  const insertAfterTarget: React.CSSProperties = {
    backgroundColor: "#ffddff"
  };
}

namespace Styles {
  const insertBeforeTarget = Object.assign(
    {},
    NormalStyles.insertTarget,
    NormalStyles.insertBeforeTarget,
    isDebug ? DebugStyles.insertTarget : {},
    isDebug ? DebugStyles.insertBeforeTarget : {}
  );

  const insertAfterTarget = Object.assign(
    {},
    NormalStyles.insertTarget,
    NormalStyles.insertAfterTarget,
    isDebug ? DebugStyles.insertTarget : {},
    isDebug ? DebugStyles.insertAfterTarget : {}
  );

  const insertTargetCanDrop: React.CSSProperties = Object.assign(
    {},
    NormalStyles.insertTargetCanDrop,
    isDebug ? DebugStyles.insertTargetCanDrop : {}
  );

  const insertTargetDropping: React.CSSProperties = Object.assign(
    {},
    NormalStyles.insertTargetDropping,
    isDebug ? DebugStyles.insertTargetDropping : {}
  );

  const insertTargetMarkerDropping: React.CSSProperties =
    NormalStyles.insertTargetMarkerDropping;
}

interface TreeViewItemProps {
  readonly parentNode: TreeNode;
  readonly parentChildIndex: number;
  readonly precedingNode: TreeNode;
  readonly node: TreeNode;
  readonly classNames: TreeViewClassNames;
  readonly renderNode: (node: TreeNode) => JSX.Element;
  readonly onMoveNode: MoveTreeNode;
}

interface TreeViewItemDragProps {
  readonly connectDragSource: ConnectDragSource;
  readonly isDragging: boolean;
}

interface TreeViewInsertTargetProps {
  readonly parentNode: TreeNode;
  readonly parentChildIndex: number;
  readonly precedingNode: TreeNode;
  readonly insertBefore: boolean;
  readonly onMoveNode: MoveTreeNode;
}

interface TreeViewInsertTargetDropProps {
  readonly connectDropTarget: ConnectDropTarget;
  readonly canDrop: boolean;
  readonly isDropping: boolean;
}

interface TreeViewItemListProps {
  readonly parentNode: TreeNode;
  readonly nodes: TreeNodeList;
  readonly renderNode: (node: TreeNode) => JSX.Element;
  readonly classNames: TreeViewClassNames;
  readonly onMoveNode: MoveTreeNode;
}
