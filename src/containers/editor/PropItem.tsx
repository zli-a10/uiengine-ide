import React, { useState, useContext, useCallback } from "react";
import _ from "lodash";
import { Context } from "../editor/Context";

import { schemaTidy, SchemaPropManager } from "../../helpers";
import * as propComponents from "./prop";
const schemaPropManager = SchemaPropManager.getInstance();

export const PropItem = (props: any) => {
  const {
    info: { editNode }
  } = useContext(Context);
  const { schema, data, name, section = "prop" } = props;
  const standardSchema = schemaTidy(schema);
  let { type = "string", ...schemaProps } = standardSchema;

  let componentType = props.type;
  if (!componentType) {
    componentType = type || "string";
  }
  const componentName = `${_.upperFirst(componentType)}Component`;
  const Com = propComponents[componentName];

  const [value, setValue] = useState();

  const onChange = (v: any) => {
    setValue(v);
    schemaPropManager.applySchema(
      section,
      section === "prop" ? { [name]: standardSchema } : standardSchema,
      v,
      editNode,
      props
    );
  };

  if (Com) {
    return (
      <Com
        onChange={onChange}
        value={value || data || _.get(standardSchema, "default")}
        {...schemaProps}
        {...props}
      />
    );
  } else {
    return null;
  }
};
