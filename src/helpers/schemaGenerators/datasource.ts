import _ from 'lodash';

export const datasource = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options: any = {}
) => {
  // TODO: validate by componentSchema
  if (!_.get(value, 'source')) {
    return { datasource: null };
  }
  return { datasource: value };
};
