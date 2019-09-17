import _ from "lodash";
export const event = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options: any = {}
) => {
  // TODO: validate by componentSchema
  // console.log(options);
  const dataRef = _.get(options, "dataRef", {});
  const isOptions = _.get(options, "isOptions", false);
  const eventsSchema = _.get(options, "uinode.schema.props.$events", []);
  const theEventIndex = !_.isEmpty(dataRef)
    ? _.findIndex(eventsSchema, dataRef)
    : -1;
  if (isOptions && theEventIndex > -1) {
    // set options
    _.set(dataRef, name, value);
    eventsSchema[theEventIndex] = dataRef;
  } else {
    _.merge(dataRef, value);
    if (theEventIndex === -1) {
      eventsSchema.push(dataRef);
    } else {
      eventsSchema[theEventIndex] = dataRef;
    }
  }

  _.set(options, "uinode.schema.props.$events", eventsSchema);
  return {};
};
