import _ from "lodash";
export const event = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options: any = {}
) => {
  // TODO: validate by componentSchema
  // console.log(name, componentSchema, value, options);
  const schema = {
    props: {
      $events: [
        {
          event: options["name"],
          action: value
        }
      ]
    }
  };
  return schema;
};
