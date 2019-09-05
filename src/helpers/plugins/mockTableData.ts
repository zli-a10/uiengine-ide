import _ from "lodash";
import { IPluginFunc, IPlugin, IDataNode } from "uiengine/typings";
import { DataMocker } from "../DataMocker";
const dataMocker = DataMocker.getInstance();

/**
 * mock Table Data
 *
 * @param dataNode
 */
const callback: IPluginFunc = async (dataNode: IDataNode) => {
  if (_.has(dataNode, `uiNode.schema.$children`)) {
    let data = await dataMocker.generateTableData(
      dataNode.uiNode.schema.$children,
      10
    );
    _.forIn(data, (d: any, path: string) => {
      dataNode.dataPool.set(d, path);
    });
    console.log(dataNode.dataPool.data);

    return data;
  }
};

export const mockTableData: IPlugin = {
  type: "data.data.parser",
  priority: 200,
  callback,
  name: "mock-table-data"
};
