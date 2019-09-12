import _ from "lodash";
import { Event } from "uiengine";
import {
  IPlugin,
  IPluginParam,
  IUINode,
  IPluginExecution
} from "uiengine/typings";

const execution: IPluginExecution = async (param: IPluginParam) => {
  const uiNode: IUINode = _.get(param, "uiNode");
  const schema = uiNode.getSchema();
  const props: any = _.get(schema, "props", {});
  const layout: any = _.get(schema, "layout", {});

  // get data value
  const value = uiNode.dataNode.data;

  // load event and default event
  let $events: any = props.$events || [];
  if (!props.$events) {
    $events = [
      {
        event: "onChange",
        action: "change"
      }
    ];
  }
  const event = new Event(uiNode);
  let eventFuncs = await event.loadEvents($events);

  // get error validation info
  const errorInfo = uiNode.dataNode.errorInfo;
  // assign all default props
  let result = {
    // key: uiNode.id,
    value,
    error: errorInfo,
    ...eventFuncs
  };

  // assign user defined props;
  if (props) {
    let { $events, ide_droppable, style, ...rest } = props as any;
    style = _.merge(style, layout);
    // assign props to uiNode
    result = { ...rest, ...result, style };
  }
  uiNode.props = result;
  return result;
};

export const setExampleProps: IPlugin = {
  categories: ["ui.parser"],
  paramKeys: ["uiNode"],
  priority: 200,
  execution,
  name: "set-example-props"
};
