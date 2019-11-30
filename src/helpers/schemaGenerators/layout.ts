import _ from 'lodash';

export const layout = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options?: any
) => {
  return {
    layout: value
  };
};
