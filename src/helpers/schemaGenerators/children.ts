import _ from 'lodash';

export const children = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options: any = {}
) => {
  // TODO: validate by componentSchema
  return { $$children: value };
};
