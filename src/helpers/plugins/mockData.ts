import _ from "lodash";
import {
  IPlugin,
  IPluginParam,
  IDataNode,
  IPluginExecution
} from "uiengine/typings";
import { DataMocker } from "../DataMocker";
const dataMocker = DataMocker.getInstance();

/**
 * mock Data
 *
 * @param dataNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  const dataNode: IDataNode = _.get(param, "dataNode");

  if (dataNode.schema) {
    let data = dataMocker.generate(dataNode.schema);
    dataNode.data = data;
  }
};

export const mockData: IPlugin = {
  categories: ["data.schema.parser"],
  paramKeys: ["dataNode"],
  priority: 0,
  execution,
  name: "mock-data"
};
