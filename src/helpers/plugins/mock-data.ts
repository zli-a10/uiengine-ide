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
const execution: IPluginExecution = (param: IPluginParam) => {
  const dataNode: IDataNode = _.get(param, "dataNode");
  const dataMocker = DataMocker.getInstance();
  if (dataMocker.mode !== NO_MOCK) {
    const data = dataMocker.generate(dataNode.schema);
    return data;
  }
};

export const mockData: IPlugin = {
  name: "mockData",
  categories: ["data.data.parser"],
  paramKeys: ["dataNode"],
  priority: 0,
  execution
};
