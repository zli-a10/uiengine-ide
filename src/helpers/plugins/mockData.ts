import _ from "lodash";
import { IPluginFunc, IPlugin, IDataNode } from "uiengine/typings";
import { DataMocker } from "../DataMocker";
const dataMocker = DataMocker.getInstance();

/**
 * mock Data
 *
 * @param dataNode
 */
const callback: IPluginFunc = async (dataNode: IDataNode) => {
  if (dataNode.schema) {
    let data = dataMocker.generate(dataNode.schema);
    dataNode.data = data;
  }
};

export const mockData: IPlugin = {
  type: "data.schema.parser",
  priority: 101,
  callback,
  name: "mock-data"
};
