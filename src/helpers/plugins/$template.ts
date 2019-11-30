import _ from 'lodash';
import {
  IPlugin,
  IPluginParam,
  IUINode,
  IPluginExecution
} from 'uiengine/typings';
import { FileLoader } from '../FileLoader';

/**
 * load $$children && $$template
 *
 * @param uiNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  const uiNode: IUINode = _.get(param, 'uiNode');

  const fileLoader = FileLoader.getInstance();
  // parse $$template

  if (_.has(uiNode.schema, '$template')) {
    const path = _.get(uiNode.schema, '$template');
    const isSysTemplate = _.get(uiNode.schema, 'isSysTemplate');

    try {
      let schema = await fileLoader.loadFile(path, 'schema', isSysTemplate);

      console.log(schema, '.............schema');
      if (!schema) {
        schema = {
          component: 'div',
          content: `Load template ${path} failed, please make sure the file was not deleted`
        };
      }
      _.merge(uiNode.schema, schema);
      _.unset(uiNode.schema, '$template');
      _.set(uiNode.schema, '$$template', path);
      await uiNode.refreshLayout();
    } catch (e) {
      console.warn(e.message);
    }
  }
};

export const $template: IPlugin = {
  categories: ['ui.parser'],
  paramKeys: ['uiNode'],
  priority: 202,
  execution,
  name: '$template'
};
