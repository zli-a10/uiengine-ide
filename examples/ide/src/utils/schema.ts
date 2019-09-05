import * as _ from "lodash";
import { getSchema } from "./request";

const getFieldComponent = (field: any) => {
  const { type } = field;
  switch (type) {
    case "input":
      return "antd:Input";
    case "input-number":
      return "antd:InputNumber";
    case "select":
      return "antd:Select";
    case "dummy-object":
      return "antd:Col";
    case "switch":
      return "antd:Switch";
    case "table":
      return "antd:Col";
    default:
      return "antd:Input";
  }
};

const getUiSchema = (field: any) => {
  const source = _.replace(
    field["cm-lineage"],
    `.${field.key}`,
    `:${field.key}`
  );
  return {
    type: "field",
    name: field.key,
    datasource: { source },
    uiSchema: {
      component: "antd:Form.Item",
      datasource: { source },
      props: {
        label: field.label
      },
      children: [
        {
          component: getFieldComponent(field),
          ...(Array.isArray(field.fields)
            ? {
                children: field.fields.map((subField: any) => {
                  return getUiSchema(subField);
                })
              }
            : {})
        }
      ]
    }
  };
};

const getTopSchema = (fields: any[]) => {
  return {
    component: "antd:Col",
    // datasource: { source: '' },
    children: fields.map((field: any) => {
      return getUiSchema(field);
    })
  };
};

const getDataSource = (field: any) => {
  const source = _.replace(
    field["cm-lineage"],
    `.${field.key}`,
    `:${field.key}`
  );
  return {
    component: getFieldComponent(field),
    datasource: { source }
  };
};

export const expandDataSource = async (uiJson: string) => {
  const schema = (await getSchema("schema/json/schema.json")) || { fields: [] };
  const analysisFields = (fields: any[]): any[] => {
    return fields.map((field: any) => {
      return {
        type: "field",
        name: field.key,
        children: field.fields ? analysisFields(field.fields) : null,
        uiSchema: getDataSource(field)
      };
    });
  };

  const sources = analysisFields(schema.fields || []);
  const topUiSchema = getTopSchema(schema.fields || []);
  return [sources, topUiSchema];
};
