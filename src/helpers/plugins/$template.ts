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
  // parse $$template
  if (_.has(uiNode.schema, "$template")) {
    const path = _.get(uiNode.schema, "$template");
    _.unset(uiNode.schema, "$template");
    _.set(uiNode.schema, "$$template", path);
    const schema = fileLoader.loadFile(path, "schema");
    _.merge(uiNode.schema, schema);
    await uiNode.updateLayout();
  }
};

export const template: IPlugin = {
  type: "ui.parser",
  priority: 202,
  callback,
  name: "template"
};
