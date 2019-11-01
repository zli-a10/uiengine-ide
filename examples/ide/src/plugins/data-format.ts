import _ from "lodash";
import { IPlugin, IPluginParam, IPluginExecution } from "uiengine/typings";
import { IDERegister } from "uiengine-ide";
import * as formatters from "./data-formatters";
IDERegister.registerFormatters(formatters);

/**
 * load isTable prop
 *
 * @param uiNode
 */
const execution: IPluginExecution = async (param: IPluginParam) => {
  const value: any = _.get(param, "component.props.uiNode.dataNode.data");
  if (value) {
    const props = _.get(param, "props");
    const schema = _.get(props, "uinode.schema.props.formatter");
    if (schema) {
      // console.log(schema);
      const { name, ...params } = schema;
      const formatterFunctions: any = formatters;
      if (
        formatterFunctions[name] &&
        _.isFunction(formatterFunctions[name].execution)
      ) {
        props.value = formatterFunctions[name].execution(value, params);
      }
    } else {
      props.value = value;
    }
  }
};

export const dataFormatter: IPlugin = {
  categories: ["component.props.get"],
  paramKeys: ["props", "component"],
  priority: 1,
  execution,
  name: "dataFormaater"
};
