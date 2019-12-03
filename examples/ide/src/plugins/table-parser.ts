import _ from "lodash";
import { IPlugin, IPluginParam, IPluginExecution } from "uiengine/typings";

import { MemoStore } from "uiengine-ide";

/**
 * load isTable prop
 *
 * @param uiNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  // const uiNode: IUINode = _.get(param, "uiNode");
  const schema = _.get(param, "schema");

  const isTable = _.get(schema, "props.isTable");
  const idePreviewMode = MemoStore.bucket.preview;
  if (isTable === true) {
    if (!idePreviewMode) {
      let childrenTemplate = _.get(schema, "$children");
      if (childrenTemplate) {
        // _.set(uiNode.schema, "children", childrenTemplate);
        schema.children = childrenTemplate;
      }
      _.unset(schema, "$children");
    } else {
      let childrenTemplate = _.get(schema, "$children");
      if (!childrenTemplate) {
        childrenTemplate = _.get(schema, "children");
        // _.set(uiNode.schema, "$children", childrenTemplate);
        schema.$children = childrenTemplate;
      }
    }
  }
  return schema;
};

export const tableParser: IPlugin = {
  categories: ["ui.parser.before"],
  paramKeys: ["uiNode", "schema"],
  priority: 2,
  execution,
  name: "tableParser"
};
