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
 * mock Table Data
 *
 * @param dataNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  const dataNode: IDataNode = _.get(param, "dataNode");
  if (_.has(dataNode, `uiNode.schema.$children`)) {
    if (_.isArray(_.get(dataNode, `uiNode.schema.$children`))) {
      const result = dataMocker.generateTableData(dataNode.uiNode);
      dataNode.data = result;
      return result;
    }
  }
};

export const mockTableData: IPlugin = {
  categories: ["data.data.parser"],
  paramKeys: ["dataNode"],
  priority: 200,
  execution,
  name: "mockTableData"
};
