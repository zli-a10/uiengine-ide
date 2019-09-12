import _ from "lodash";
import {
  IPlugin,
  IPluginParam,
  IDataNode,
  IPluginExecution
} from "uiengine/typings";

/**
 * get cm lineage by UI schema
 *
 * @param dataNode
 */
const execution: IPluginExecution = (param: IPluginParam) => {
  const dataNode: IDataNode = _.get(param, "dataNode");
  const rootSchema = dataNode.rootSchema;
  let schemaPath = dataNode.source.schema || dataNode.source.source;
  let name = schemaPath.replace(":", ".");
  const regex = /\[\d+\]/;
  name = name.replace(regex, "");
  let result = _.get(rootSchema, `fields`, []).find((schema: any) => {
    return schema["cm-lineage"] === name;
  });

  dataNode.schema = result;
};

export const schemaParser: IPlugin = {
  categories: ["data.schema.parser"],
  paramKeys: ["dataNode"],
  priority: 1,
  execution,
  name: "parse-schema",
  debugList: ["dataNode.data"]
};
