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

  // parse $$children
  const $$children = _.get(uiNode.schema, '$$children');
  // const $children = _.get(uiNode.schema, "$children");

  if ($$children) {
    const schema = await fileLoader.loadFile($$children, 'schema');

    if (!_.isArray(schema.children)) return;
    _.set(uiNode, 'schema.$children', schema.children);
    _.set(uiNode, 'schema.$_children', $$children);
    _.unset(uiNode, 'schema.$$children');
    await uiNode.refreshLayout();
  }
};

export const $$children: IPlugin = {
  categories: ['ui.parser'],
  paramKeys: ['uiNode'],
  priority: 201,
  execution,
  name: '$$children'
};
