import _ from "lodash";
import { NodeController } from "uiengine";
import { IUINode } from "uiengine/typings";

export function difference(object: any, base: any) {
  function changes(object: any, base: any) {
    return _.transform(object, function(result: any, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}

export function getActiveUINode(schemaOnly: boolean = false) {
  const nodeController = NodeController.getInstance();
  const uiNode = nodeController.getUINode(nodeController.activeLayout, true);
  if (schemaOnly) {
    return (uiNode as IUINode).schema;
  }
  return uiNode;
}

export function getTreeRoot(treeRoot: any) {
  let root = null;
  while (treeRoot) {
    if (!treeRoot._parent_) {
      root = treeRoot;
    }
    treeRoot = treeRoot._parent_;
  }
  return root;
}
