import _ from "lodash";
import { IPluginFunc, IPlugin, IDataNode } from "uiengine/typings";
import { DataMocker } from "../DataMocker";
/**
 * mock Data
 *
 * @param dataNode
 */
const callback: IPluginFunc = (dataNode: IDataNode) => {
  if (dataNode.schema) {
    const dataMocker = DataMocker.getInstance();
    let data = dataMocker.generate(_.cloneDeep(dataNode.schema));
    dataNode.data = data;

    return data;
  }
};

export const mockData: IPlugin = {
  type: "data.schema.parser",
  priority: 99,
  callback,
  name: "mock-data"
};
