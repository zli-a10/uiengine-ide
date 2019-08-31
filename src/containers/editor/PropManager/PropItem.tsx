import React, { useState, useContext, useEffect } from "react";
import _ from "lodash";

import { schemaTidy, SchemaPropManager } from "../../../helpers";
import * as propComponents from "../PropItems";
const schemaPropManager = SchemaPropManager.getInstance();

export const PropItem = (props: any) => {
  const { schema, data, name, uinode, section = "prop" } = props;
  const standardSchema = schemaTidy(schema);
  let { type = "string", ...schemaProps } = standardSchema;

  let componentType = props.type;
  if (!componentType) {
    componentType = type || "string";
  }
  const componentName = `${_.upperFirst(componentType)}Component`;
  const Com = propComponents[componentName];
  const [value, setValue] = useState(data);

  const onChange = (v: any) => {
    setValue(v);
    schemaPropManager.applySchema(
      section,
      section === "prop" ? { [name]: standardSchema } : standardSchema,
      v,
      uinode,
      props
    );
  };

  useEffect(() => {
    setValue(data);
  }, [data]);

  if (Com) {
    return (
      <Com
        onChange={onChange}
        defaultValue={_.get(standardSchema, "default")}
        value={value}
        uinode={uinode}
        {...schemaProps}
        {...props}
      />
    );
  } else {
    return null;
  }
};
