import _ from "lodash";
export const event = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options: any = {}
) => {
  const isSubOptions = _.get(options, "isSubOptions");
  if (!isSubOptions) {
    if (value && value.length) {
      _.set(options, "uinode.schema.props.$events", value);
    } else {
      _.unset(options, "uinode.schema.props.$events");
    }
  } else {
    let event = _.get(options, "dataRef");
    if (!_.isEmpty(event)) {
      _.set(event, name, value);
    }
  }
  return {};
};
