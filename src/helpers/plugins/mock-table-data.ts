import _ from 'lodash';
import {
  IPlugin,
  IPluginParam,
  IDataNode,
  IPluginExecution
} from 'uiengine/typings';
import { DataMocker } from '../DataMocker';
const dataMocker = DataMocker.getInstance();

/**
 * mock Table Data
 *
 * @param dataNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  const dataNode: IDataNode = _.get(param, 'dataNode');

  const $children = _.get(dataNode, 'uiNode.schema.$children')
  if (_.isArray($children) && !_.isArray(dataNode.data)) {
    dataMocker.noCache = true;
    return dataMocker.generateTableData(dataNode.uiNode);
  }
};

export const mockTableData: IPlugin = {
  name: 'mockTableData',
  categories: ['data.data.parser'],
  paramKeys: ['dataNode'],
  execution,
  priority: 200
};
