import { readFile, ICommandOptions } from "./file";
import { get, isArray, isEmpty, upperFirst } from "lodash";

const getWidgetType = (type: string) => {
  let widget = "antd:Input";
  if (type) {
    widget = "antd:" + upperFirst(type);
  }
  return widget;
};

const buildFields = (fields: any, options: ICommandOptions) => {
  return fields.map((field: any) => {
    const { path: fileName, component = "my:Form.FormItem" } = options;
    const domainName = fileName.replace(".json", "");
    const lineage = get(field, "cm-lineage", "");
    // const value = domainName + field.key
    const value = lineage.replace(`${domainName}.`, `${domainName}:`);
    // console.log('replace:::::::::::::::', lineage, value, domainName)
    let schema: any = {};
    if (field.fields) {
      schema = {
        type: "file",
        component: "div",
        title: field.key,
        value,
        id: field.key,
        children: buildFields(field.fields, options)
      };
    } else {
      schema = {
        type: "field",
        component,
        title: field.key,
        value,
        id: value,
        props: {
          label: field.label,
          type: getWidgetType(get(field, ["type"], "")),
          help: get(field, "cm-meta.help", ""),
          isAdvance: get(field, "cm-meta.gui-section") === "Advanced"
        },
        datasource: { source: value }
      };
    }
    // exclusive
    let deps: any = [];
    // const exclusion = get(field, 'cm-meta.m-exclusion', [])
    // if (isArray(exclusion)) {
    //   deps = deps.concat(
    //     exclusion.map((ex: any) => {
    //       return {
    //         selector: {
    //           'datasource.source': domainName + ex
    //         },
    //         data: '',
    //         dataCompareRule: 'is'
    //       }
    //     })
    //   )
    //   console.log(deps)
    // }

    // condition
    const condition = get(field, "cm-meta.condition");
    const prefixOfCondition = lineage
      .split(".")
      .pop()
      .replace(`${domainName}.`, `${domainName}:`);
    if (condition) {
      deps.push({
        selector: {
          "datasource.source": prefixOfCondition + condition
        },
        // "state": { visible: true }
        data: "",
        dataCompareRule: "not"
      });
    }

    // add deps to visible node
    if (!isEmpty(deps)) {
      schema.state = {
        visible: { deps }
      };
    }

    return schema;
  });
};

/**
 *
 * @param options {"name": "getDataFields", "options":{ type: "datasource", "path": name }}
 */
export function getDataFields(options: ICommandOptions) {
  const content = readFile(options);
  try {
    const jsonObj = JSON.parse(content);
    const dataFields = buildFields(jsonObj.fields, options);
    // console.log(dataFields, '................')
    return dataFields;
  } catch (e) {
    return [];
  }
}
