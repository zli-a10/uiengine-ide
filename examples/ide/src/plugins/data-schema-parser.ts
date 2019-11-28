import _ from "lodash";

import {
  IDataSchema,
  IPlugin,
  IPluginParam,
  IPluginExecution,
} from "uiengine/typings";

/**
 * get cm lineage by UI schema
 *
 * @param domainSchema
 * @param lineage
 */
const execution: IPluginExecution = (param: IPluginParam) => {
  const domainSchema: IDataSchema = _.get(param, "domainSchema");
  const lineage: string = _.get(param, "lineage");

  return _.get(domainSchema, `fields`, []).find((schema: any) => {
    return schema["cm-lineage"] === lineage;
  });
};

export const dataSchemaParser: IPlugin = {
  name: "data-schema-parser",
  categories: ["data.schema.parser"],
  paramKeys: ["domainSchema", "lineage"],
  debugList: [],
  execution,
  priority: 1,
};
