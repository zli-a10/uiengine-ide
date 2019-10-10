import _ from "lodash";
export const event = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options: any = {}
) => {
  if (value && value.length) {
    _.set(options, "uinode.schema.props.$events", value);
  } else {
    _.unset(options, "uinode.schema.props.$events");
  }
  return {};
};
