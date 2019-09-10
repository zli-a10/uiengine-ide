import _ from "lodash";

export const layout = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options?: any
) => {
  // TODO: validate by info
  return {
    layout: {
      [name]: value
    }
  };
};
