import _ from "lodash";
import {
  IPlugin,
  IPluginParam,
  IDataNode,
  IPluginExecution
} from "uiengine/typings";
import { DataMocker } from "../DataMocker";
import { NO_MOCK } from "../consts";

/**
 * mock Table Data
 *
 * @param dataNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  const dataNode: IDataNode = _.get(param, "dataNode");
  const dataMocker = DataMocker.getInstance();

  const $children = _.get(dataNode, "uiNode.schema.$children");
  if (dataMocker.mode !== NO_MOCK && _.isArray($children)) {
    dataMocker.noCache = true;
    return dataMocker.generateTableData(dataNode.uiNode);
  }
};

export const mockTableData: IPlugin = {
  name: "mockTableData",
  categories: ["data.data.parser"],
  paramKeys: ["dataNode"],
  execution,
  priority: 200
};
