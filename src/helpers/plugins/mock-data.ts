import _ from 'lodash'
import {
  IPlugin,
  IPluginParam,
  IDataNode,
  IPluginExecution
} from 'uiengine/typings'
import { DataMocker } from '../DataMocker'
const dataMocker = DataMocker.getInstance()

/**
 * mock Data
 *
 * @param dataNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  const dataNode: IDataNode = _.get(param, 'dataNode')

  if (dataNode.schema) {
    // dataMocker.noCache = false;
    let data = dataMocker.generate(dataNode.schema)
    dataNode.data = data
  }
}

export const mockData: IPlugin = {
  name: 'mockData',
  categories: ['data.data.parser'],
  paramKeys: ['dataNode'],
  execution,
  priority: 0,
}
