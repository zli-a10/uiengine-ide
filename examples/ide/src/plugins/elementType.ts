import _ from "lodash";
import {
  IPlugin,
  IPluginParam,
  IUINode,
  IPluginExecution
} from "uiengine/typings";

const execution: IPluginExecution = async (param: IPluginParam) => {
  const uiNode: IUINode = _.get(param, "uiNode");
  const inputType: string = uiNode.dataNode.getSchema("type");
  _.set(uiNode, "props.type", inputType);
};

export const setElementType: IPlugin = {
  categories: ["ui.parser"],
  paramKeys: ["uiNode"],
  priority: 0,
  execution,
  name: "set-element-type"
};
