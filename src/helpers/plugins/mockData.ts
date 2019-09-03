import _ from "lodash";
import { IPluginFunc, IPlugin, IDataNode } from "uiengine/typings";
import { DataMocker } from "../DataMocker";
/**
 * mock Data
 *
 * @param dataNode
 */
const callback: IPluginFunc = (dataNode: IDataNode) => {
  // console.log(dataNode.schema, "schema");
  if (dataNode.schema) {
    const dataMocker = DataMocker.getInstance();
    let data = dataMocker.generate(dataNode.schema);
    dataNode.data = data;
    // console.log(data, "generated");
    // return data;
  }
};

export const mockData: IPlugin = {
  type: "data.schema.parser",
  priority: 101,
  callback,
  name: "mock-data"
};
