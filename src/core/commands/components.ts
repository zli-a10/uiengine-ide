import { IDERegister } from "../../helpers";
import componentCommands from "../messages/components";

const {
  get_components,
  get_component_info,
  search_component_by_keyword,
  get_component_by_type
} = componentCommands;

export default {
  [get_components]: () => {
    return {
      // support search
      status: 200,
      output: IDERegister.componentsLibrary
    };
  },
  [get_component_info]: {
    status: 200,
    output: {
      category: "widget",
      author: "Jason",
      parent: "autoform",
      component: "ConfigList",
      icon: "xxx.svg", // default we don't provide, we use the component-name.svg/icon
      preview: "xx.png"
    }
  },
  [search_component_by_keyword]: {
    status: 200,
    output: {
      category: "widget",
      author: "Jason",
      parent: "autoform",
      component: "ConfigList",
      icon: "xxx.svg", // default we don't provide, we use the component-name.svg/icon
      preview: "xx.png"
    }
  },
  [get_component_by_type]: {
    status: 200,
    output: {
      category: "widget",
      author: "Jason",
      parent: "autoform",
      component: "ConfigList",
      icon: "xxx.svg", // default we don't provide, we use the component-name.svg/icon
      preview: "xx.png"
    }
  }
};
