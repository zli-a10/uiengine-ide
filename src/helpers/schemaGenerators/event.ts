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
  const event = _.get(options, "event", _.get(value, "event"));
  const eventsSchema = _.get(options, "uinode.schema.props.$events", []);
  const theEventIndex = !_.isEmpty(event)
    ? _.findIndex(eventsSchema, { event })
    : -1;

  if (event && theEventIndex > -1) {
    // set options
    _.set(dataRef, name, value);
    eventsSchema[theEventIndex] = dataRef;
  } else {
    _.merge(dataRef, value);
    if (theEventIndex === -1) {
      eventsSchema.push(dataRef);
    } else {
      if (!_.get(dataRef, "listener")) {
        // remove one
        eventsSchema.splice(theEventIndex, 1);
      } else {
        eventsSchema[theEventIndex] = dataRef;
      }
    }
  }

  _.set(options, "uinode.schema.props.$events", eventsSchema);
  return {};
};
