import _ from "lodash";
import {
  IPlugin,
  IPluginParam,
  IUINode,
  IPluginExecution
} from "uiengine/typings";
import { FileLoader } from "../FileLoader";

/**
 * load $$children && $$template
 *
 * @param uiNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  const uiNode: IUINode = _.get(param, "uiNode");

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

export const $template: IPlugin = {
  categories: ["ui.parser"],
  paramKeys: ["uiNode"],
  priority: 202,
  execution,
  name: "$template"
};
