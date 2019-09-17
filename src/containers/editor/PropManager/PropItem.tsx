import React, { useState, useContext, useEffect } from "react";
import _ from "lodash";
import { schemaTidy, SchemaPropManager } from "../../../helpers";
import * as propComponents from "./PropItems";
import { GlobalContext } from "../../Context";

const schemaPropManager = SchemaPropManager.getInstance();

export const PropItem = (props: IComponentSchema) => {
  const { schema, data, name, uinode, section = "prop" } = props;
  const { preview } = useContext(GlobalContext);

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
      name ? { [name]: standardSchema } : standardSchema,
      v,
      uinode,
      props
    );
  };

  useEffect(() => {
    setValue(data);
  }, [data]);

  // disable the element if it's template
  const disabled = _.has(uinode, "props.ide_droppable") || preview;
  if (type === "sub") {
    return standardSchema["sub"].map((restSchema: any) =>
      Object.entries(restSchema).map((entry: any) => (
        <PropItem
          section="prop"
          name={`${name}.${entry[0]}`}
          schema={entry[1]}
          key={`key-${entry[0]}`}
          uinode={uinode}
          data={_.get(uinode, `schema.props.${name}.${entry[0]}`)}
        />
      ))
    );
  } else if (Com) {
    return (
      <Com
        onChange={onChange}
        defaultValue={_.get(standardSchema, "default")}
        value={value}
        uinode={uinode}
        disabled={disabled}
        {...schemaProps}
        {...props}
      />
    );
  } else {
    return null;
  }
};
