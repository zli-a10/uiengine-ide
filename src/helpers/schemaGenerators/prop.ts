import _ from "lodash";

export const prop = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options?: any
) => {
  console.log(name, componentSchema, value, options);
  // TODO: validate by info
  return {
    props: {
      [name]: value
    }
  };
};
