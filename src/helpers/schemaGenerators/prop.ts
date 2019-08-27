import _ from "lodash";

export const prop = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options?: any
) => {
  // TODO: validate by info
  return {
    props: {
      [name]: value
    }
  };
};
