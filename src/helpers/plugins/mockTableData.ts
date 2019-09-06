import _ from "lodash";
import { IPluginFunc, IPlugin, IDataNode } from "uiengine/typings";
import { DataMocker } from "../DataMocker";
const dataMocker = DataMocker.getInstance();

/**
 * mock Table Data
 *
 * @param dataNode
 */
const callback: IPluginFunc = (dataNode: IDataNode) => {
  if (_.has(dataNode, `uiNode.schema.$children`)) {
    if (_.isArray(_.get(dataNode, `uiNode.schema.$children`))) {
      const result = dataMocker.generateTableData(dataNode.uiNode, 10);
      console.log(result);
      dataNode.data = result;
      console.log(dataNode.dataPool.data);
      return result;
    }
  }
};

export const mockTableData: IPlugin = {
  type: "data.data.parser",
  priority: 200,
  callback,
  name: "mock-table-data"
};
