import _ from 'lodash';

export const root = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options: any = {}
) => {
  // TODO: validate by componentSchema
  return { [name]: value };
};
