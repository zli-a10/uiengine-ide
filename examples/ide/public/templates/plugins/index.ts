import _ from "lodash";
import {
  IPlugin,
  IPluginParam,
  IUINode,
  IPluginExecution
} from "uiengine/typings";

const execution: IPluginExecution = async (param: IPluginParam) => {
  // const uiNode: IUINode = _.get(param, "uiNode");
  // const inputType: string = uiNode.dataNode.getSchema("type");
  // if (!_.get(uiNode, "props.label")) {
  //   const label: string = uiNode.dataNode.getSchema("label");
  //   _.set(uiNode, "props.label", label);
  // }
  // if (!_.has(uiNode, 'props.type')) {
  //   _.set(uiNode, "props.type", inputType);
  // }
};

export const elementType: IPlugin = {
  // avaliable categories: [data.update, data.request, data.schema, data.data, state, ui, ui.parser]
  categories: ["ui.parser"],
  // please go to the location to find params passed in, like uiNode, ....
  paramKeys: ["uiNode"],
  priority: 0,
  execution,
  name: "plugin-any-name-please-change"
};
