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
 * mock Data
 *
 * @param dataNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  const dataNode: IDataNode = _.get(param, "dataNode");
  const dataMocker = DataMocker.getInstance();
  if (dataMocker.mode !== NO_MOCK && dataNode.schema) {
    return dataMocker.generate(dataNode.schema);
  }
};

export const mockData: IPlugin = {
  name: "mockData",
  categories: ["data.data.parser"],
  paramKeys: ["dataNode"],
  priority: 0,
  execution
};
