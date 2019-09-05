import _ from "lodash";
import { IPluginFunc, IPlugin, IUINode } from "uiengine/typings";
import { FileLoader } from "../FileLoader";

/**
 * load $$children && $$template
 *
 * @param uiNode
 */
const callback: IPluginFunc = async (uiNode: IUINode) => {
  const fileLoader = FileLoader.getInstance();

  // parse $$children
  if (_.has(uiNode.schema, "$$children")) {
    const path = _.get(uiNode.schema, "$$children");
    const schema = fileLoader.loadFile(path, "schema");
    if (!schema.children || schema.children.length === 0) return;
    _.set(uiNode, "schema.$children", schema.children);
  }
};

export const $$children: IPlugin = {
  type: "ui.parser",
  priority: 1000,
  callback,
  name: "$$children"
};
