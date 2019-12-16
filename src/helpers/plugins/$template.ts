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

  if (!_.isNil(uiNode)) {
    const schema = uiNode.schema

    if (_.has(schema, '$template')) {
      const templatePath: string = _.get(schema, '$template');
      const isSysTemplate: boolean = _.get(schema, 'isSysTemplate');

      try {
        const fileLoader = FileLoader.getInstance();
        const loadedSchema = await fileLoader.loadFile(templatePath, 'schema', isSysTemplate);

        if (_.isNil(loadedSchema)) {
          return {
            component: 'div',
            content: `Load template ${templatePath} failed, please make sure the file was not deleted`
          };
        } else {
          _.unset(schema, '$template');
          _.set(schema, '$$template', templatePath);
          return loadedSchema
        }
      } catch (e) {
        console.warn(e.message);
      }
    }
  }

  // parse $$template
};

export const $template: IPlugin = {
  categories: ['ui.parser.before'],
  paramKeys: ['uiNode'],
  priority: 202,
  execution,
  name: '$template'
};
