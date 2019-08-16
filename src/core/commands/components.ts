import componentCommands from "../messages/components";

const {
  get_components,
  get_component_info,
  search_component_by_keyword,
  get_component_by_type
} = componentCommands;

export default {
  [get_components]: {
    // support search
    status: 200,
    output: [
      {
        version: "1.1",
        url: "gui-widgets.git",
        author: "rui",
        title: "Widgets",
        children: [
          {
            category: "layout", // data-entry, layout, autoform
            author: "Rui",
            title: "Grid",
            component: "Grid"
          },
          {
            category: "navigation",
            author: "Rui",
            title: "Menu",
            component: "Menu"
          }
        ]
      },
      {
        version: "1.1",
        url: "wiz-ide.git",
        author: "chris",
        title: "Auto Form",
        children: [
          {
            category: "widget",
            author: "Jason",
            parent: "autoform",
            title: "Config List",
            component: "ConfigList",
            icon: "xxx.svg", // default we don't provide, we use the component-name.svg/icon
            preview: "xx.png"
          },
          {
            category: "container",
            author: "Rui",
            title: "Auto Form",
            parent: "autoform",
            component: "Table"
          }
        ]
      }
    ]
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
