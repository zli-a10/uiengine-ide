import React, { useState } from "react";
import _ from "lodash";
import { schemaTidy } from "../../helpers";
import * as propComponents from "../prop";

export const FieldComponent = (props: any) => {
  const { fieldSchema, data, ...restProps } = props;
  const standardSchema = schemaTidy(fieldSchema);
  let { type = "string", ...schema } = standardSchema;

  let componentType = props.type;
  if (!componentType) {
    componentType = type || "string";
  }
  const componentName = `${_.upperFirst(componentType)}Component`;
  const Com = propComponents[componentName];

  const [value, setValue] = useState();
  const onChange = (v: any) => {
    setValue(v);
  };
  // console.log(props, componentType);
  if (Com) {
    return (
      <Com
        onChange={onChange}
        value={value || data || schema.default}
        {...schema}
        {...restProps}
      />
    );
  } else {
    return null;
  }
};
