import _ from "lodash";
export const event = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options: any = {}
) => {
  // TODO: validate by componentSchema
  return {
    props: {
      $events: [
        {
          event: name,
          action: value,
          options: options
        }
      ]
    }
  };
};
