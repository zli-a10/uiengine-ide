import _ from "lodash";
import { ListenerManager } from "uiengine";

import {
  IPlugin,
  IPluginExecution,
  IUINode,
  IPluginParam,
  IEventConfig
} from "uiengine/typings";

function getDefaultEventConfig(component: string, type: string) {
  const onChangeWithEvent: IEventConfig = {
    eventName: "onChange",
    receiveParams: ["event"],
    listener: "updateData"
  };
  const onChangeWithValue: IEventConfig = {
    eventName: "onChange",
    receiveParams: ["value"],
    listener: "updateData"
  };

  if (_.isString(component) && component) {
    if (component.includes("antd:")) {
      switch (true) {
        case component === "antd:Input":
        case component.includes("antd:Input."):
        case component === "antd:Checkbox":
        case component === "antd:Radio.Group":
          return [onChangeWithEvent];
        case component === "antd:InputNumber":
        case component === "antd:Checkbox.Group":
        case component === "antd:Switch":
        case component === "antd:Select":
          return [onChangeWithValue];
        default:
          return [];
      }
    } else if (component.includes("my:")) {
      switch (true) {
        case component === "my:FormItem":
          break;
        default:
          return [];
      }
    } else {
      return [onChangeWithValue];
    }
  }

  if (_.isString(type) && type) {
    if (type === "input-number") {
      type = "InputNumber";
    }
    if (type.indexOf(":") === -1) {
      type = "antd:" + _.upperFirst(type);
    }

    if (type.includes("antd:")) {
      switch (true) {
        case type === "antd:Input":
        case type.includes("antd:Input."):
        case type === "antd:Checkbox":
        case type === "antd:Radio.Group":
          return [onChangeWithEvent];
        case type === "antd:InputNumber":
        case type === "antd:Checkbox.Group":
        case type === "antd:Switch":
        case type === "antd:Select":
          return [onChangeWithValue];
        default:
          return [];
      }
    } else {
      return [onChangeWithValue];
    }
  }

  return [];
}

const execution: IPluginExecution = async (directParam: IPluginParam) => {
  const uiNode: IUINode = _.get(directParam, "props.uinode");

  const schema = uiNode.getSchema();
  const component: any = _.get(schema, "component");
  const schemaProps: any = _.get(schema, "props");

  const dataNode = uiNode.dataNode;
  // load label & type from data schema
  const dataLabel: string = dataNode.getSchema("label");
  const inputType: string = dataNode.getSchema("type") || "input";
  // get data value
  const value = dataNode.data;
  const valueKey = _.get(props, "$valueKey", "value");
  // get error validation info
  const error = dataNode.errorInfo;

  // assign all default props
  let result = {
    key: uiNode.id,
    label: dataLabel,
    type: inputType,
    [valueKey]: value,
    error
  };

  let eventConfigs: IEventConfig[] = [];
  // assign user defined props
  if (_.isObject(schemaProps)) {
    let {
      label = dataLabel,
      type = inputType,
      $valueKey,
      ide_droppable,
      style,
      $events,
      ...rest
    } = schemaProps as any;

    // get event configs
    if (_.isArray($events) && $events.length > 0) {
      eventConfigs = $events;
    }

    const layout: any = _.get(schema, "layout", {});
    style = _.merge(style, layout);

    // assign props to result
    result = { ...rest, ...result, label, type, style };
  }

  // get default event configs
  if (_.isArray(eventConfigs) && eventConfigs.length === 0) {
    const { type } = result;
    eventConfigs = getDefaultEventConfig(component, type);
  }

  const manager = ListenerManager.getInstance();
  let eventFuncs = manager.getStaticEventProps(
    eventConfigs.map((config: IEventConfig) => {
      // console.log(config);
      const {
        eventName,
        receiveParams,
        defaultParams,
        target,
        listener
      } = config;

      const a = {
        eventName: _.isString(eventName) ? eventName : "",
        receiveParams: _.isArray(receiveParams) ? receiveParams : [],
        defaultParams: {
          ...(_.isObject(defaultParams) ? defaultParams : {}),
          props: result,
          uiNode
        },
        target: _.isString(target) ? target : uiNode.id,
        listener: _.isString(listener) ? listener : ""
      };

      return a;
    })
  );
  if (!_.isEmpty(eventFuncs)) {
    result = { ...result, ...eventFuncs };
  }

  // uiNode.props = result;
  // merge result into component props
  const newProps = _.merge(directParam.props, result);
  return newProps;
};

export const props: IPlugin = {
  name: "props-parser",
  // categories: ["ui.parser"],
  // paramKeys: ["uiNode"],
  categories: ["component.props.get"],
  paramKeys: ["props"],
  execution,
  priority: 200
};
