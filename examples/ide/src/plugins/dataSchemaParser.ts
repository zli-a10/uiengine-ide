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
  // console.log(_.cloneDeep(rootSchema), name);
  let result = _.get(rootSchema, `fields`, []).find((schema: any) => {
    return schema["cm-lineage"] === name;
  });

  // parse data schema deps
  // result = result.pop();
  dataNode.schema = result;
  // console.log("schema fetched", result);
};

export const schemaParser: IPlugin = {
  categories: ["data.schema.parser"],
  paramKeys: ["dataNode"],
  priority: 100,
  execution,
  name: "parse-schema"
};
