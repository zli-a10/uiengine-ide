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
  const $$children = _.get(uiNode.schema, "$$children");
  // const $children = _.get(uiNode.schema, "$children");
  if ($$children) {
    const schema = fileLoader.loadFile($$children, "schema");
    if (!schema.children || schema.children.length === 0) return;
    _.set(uiNode, "schema.$children", schema.children);
    _.set(uiNode, "schema.$_children", $$children);
    _.unset(uiNode, "schema.$$children");
    await uiNode.updateLayout();
  }
};

export const $$children: IPlugin = {
  type: "ui.parser",
  priority: 201,
  callback,
  name: "$$children"
};
