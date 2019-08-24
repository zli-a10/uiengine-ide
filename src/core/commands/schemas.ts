import schemaCommands from "../messages/schemas";
import { FileLoader, defaultEmptyLayoutSchema } from "../../helpers";

const {
  get_schemas,
  get_schema_info,
  get_schema_outline,
  add_schema,
  delete_schema,
  rename_schema,
  clone_schema,
  get_layouts
} = schemaCommands;
const fileLoader = FileLoader.getInstance();

export default {
  [get_schemas]: (params: any) => {
    return {
      status: 200,
      output: {
        start: 0,
        offset: 100,
        total: 10001,
        children: [fileLoader.loadFileTree("schema")]
      }
    };
  },
  [get_schema_info]: {
    status: 200,
    output: {
      type: "page",
      name: "waf-form",
      title: "Table1",
      app: "WAF",
      platform: "acos",
      version: "1.0",
      author: "Zuoping",
      url: "wiz-ide.git"
    }
  },
  [get_schema_outline]: {
    status: 200,
    output: {
      version: "1.0",
      name: "waf-form",
      title: "Template Form",
      children: [
        {
          component: "AutoForm",
          name: "autoform-1",
          children: [
            {
              component: "Section",
              name: "basic-section",
              children: [
                { component: "InputField", name: "virtual-server-name" },
                { component: "IpField", name: "ipv4-address" }
              ]
            },
            {
              component: "Advance",
              name: "advance-section",
              children: [
                { component: "InputField", name: "virtual-server-template" },
                { component: "ConfigList", name: "acl-list" }
              ]
            }
          ]
        }
      ]
    }
  },
  [add_schema]: (params: any) => {
    let { path, root } = params;
    const result = fileLoader.saveFile(
      path,
      defaultEmptyLayoutSchema,
      "schema",
      root
    );
    return result;
  },
  [delete_schema]: {
    status: 200
  },
  [rename_schema]: (params: any) => {
    let { path, oldPath, root } = params;
    const content = fileLoader.loadFile(oldPath);
    fileLoader.removeFile(oldPath);
    return fileLoader.saveFile(
      path,
      content || defaultEmptyLayoutSchema,
      "schema",
      root
    );
  },
  [clone_schema]: {
    status: 200,
    output: {
      type: "page",
      name: "waf-form-4",
      title: "WAF-CLONED-FORM",
      app: "WAF",
      platform: "acos",
      version: "1.0",
      author: "Zuoping",
      url: "wiz-ide.git"
    }
  },
  [get_layouts]: {
    status: 200,
    output: [
      {
        version: "1.1",
        url: "widgets-layout.git",
        author: "rui",
        title: "Component Layout",
        children: [
          {
            category: "page", // data-entry, layout, autoform
            author: "Rui",
            title: "2-columns",
            data: "2-columns.json"
          },
          {
            category: "navigation",
            author: "Rui",
            title: "2-rows",
            data: "2-rows.json"
          }
        ]
      },
      {
        version: "1.1",
        url: "page-layout.git",
        author: "chris",
        title: "Page Layout",
        children: [
          {
            category: "widget",
            author: "Jason",
            title: "2-columns",
            data: "2-columns.json",
            icon: "xxx.svg", // default we don't provide, we use the component-name.svg/icon
            preview: "xx.png"
          },
          {
            category: "container",
            author: "Rui",
            title: "2-rows",
            data: "2-rows.json"
          }
        ]
      }
    ]
  }
};
