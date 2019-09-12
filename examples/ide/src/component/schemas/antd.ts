export default [
  {
    id: "general", // prefix
    title: "General",
    children: [
      {
        component: "antd:Icon",
        title: "Icon",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Typography",
        title: "Typography",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Button",
        title: "Button",
        isContainer: false,
        schema: {
          disabled: "string",
          size: ["small", "large"],
          loading: "boolean|number",
          type: ["primary", "dashed", "danger", "link"],
          shape: ["circle", "round"],
          icon: "icon",
          events: ["onClick"]
        },
        defaultProps: {
          content: "Button"
        }
      }
    ]
  },
  {
    id: "grid", // prefix
    title: "Grid",
    children: [
      {
        component: "antd:Row",
        title: "Row",
        isContainer: true,
        schema: {
          gutter: [{ types: ["xs", "sm", "md"] }, { range: [1, 24] }],
          align: [{ default: "top" }, { options: ["top", "middle", "bottom"] }],
          justify: [
            {
              options: [
                "start",
                "end",
                "center",
                "space-around",
                "space-between"
              ]
            }
          ]
        }
      },
      {
        component: "antd:Col",
        title: "Column",
        isContainer: true,
        schema: {
          span: [1, 24],
          type: ["xs", "sm", "md", "lg", "xl", "xxl"],
          offset: "number"
        }
      },
      {
        component: "antd:Layout",
        title: "Layout",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:Layout.Header",
        title: "Header",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:Layout.Footer",
        title: "Footer",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:Layout.Sider",
        title: "Sider",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:Content",
        title: "Content",
        isContainer: true,
        schema: {}
      }
    ]
  },
  {
    id: "navigator", // prefix
    title: "Navigator",
    children: [
      {
        component: "antd:Affix",
        title: "affix",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Breadcrumb",
        title: "Breadcrumb",
        isContainer: false,
        schema: {},
        children: [
          {
            component: "antd:Breadcrumb.Item",
            title: "Item",
            isContainer: false,
            schema: {}
          },
          {
            component: "antd:Breadcrumb.Separator",
            title: "Separator",
            isContainer: false,
            schema: {}
          }
        ]
      },
      {
        component: "antd:Dropdown",
        title: "Dropdown",
        isContainer: false,
        schema: {},
        children: [
          {
            component: "antd:Dropdown.Button",
            title: "Button",
            isContainer: false,
            schema: {}
          }
        ]
      },
      {
        component: "antd:Menu",
        title: "Menu",
        isContainer: true,
        schema: {},
        children: [
          {
            component: "antd:Menu.Item",
            title: "Item",
            isContainer: true,
            schema: {}
          },
          {
            component: "antd:Menu.SubMenu",
            title: "SubMenu",
            isContainer: true,
            schema: {}
          },
          {
            component: "antd:Menu.ItemGroup",
            title: "ItemGroup",
            isContainer: false,
            schema: {}
          },
          {
            component: "antd:Menu.Divider",
            title: "Divider",
            isContainer: false,
            schema: {}
          }
        ]
      },
      {
        component: "antd:Pagination",
        title: "Pagination",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:PageHeader",
        title: "PageHeader",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:Steps",
        title: "Steps",
        isContainer: false,
        schema: {},
        children: [
          {
            component: "antd:Steps.Step",
            title: "Steps.Step",
            isContainer: false,
            schema: {}
          }
        ]
      }
    ]
  },

  {
    id: "data-input", // prefix
    title: "Data Input",
    children: [
      {
        component: "antd:Form",
        title: "Form",
        isContainer: true,
        schema: {
          layout: ["horizontal", "vertical", "inline"],
          labelAlign: ["left", "right"],
          labelCol: [{ sm: [{ span: "number" }, { offset: "number" }] }],
          hideRequiredMark: "boolean"
        },
        children: [
          {
            component: "antd:Form.Item",
            title: "Item",
            isContainer: true,
            schema: {
              extra: [{ help: "string" }],
              label: "string",
              labelCol: [{ sm: [{ span: "number" }, { offset: "number" }] }],
              required: "boolean",
              htmlFor: "string",
              hasFeedback: "boolean"
            },
            defaultProps: {
              label: "Lable Name",
              required: true
            }
          }
        ]
      },
      {
        component: "antd:Input",
        title: "Input",
        isContainer: false,
        schema: {
          defaultValue: "string",
          prefix: "string",
          suffix: "string",
          disabled: "boolean",
          addonAfter: "component",
          addonBefore: "component",
          events: ["onChange", "onPressEnter"]
        }
      },
      {
        component: "antd:AutoComplete",
        title: "AutoComplete",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Checkbox",
        title: "Checkbox",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Cascader",
        title: "Cascader",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:DataPicker",
        title: "DataPicker",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:InputNumber",
        title: "InputNumber",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Mentions",
        title: "Mentions",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Rate",
        title: "Rate",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Radio",
        title: "Radio",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Switch",
        title: "Switch",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Sider",
        title: "Sider",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Select",
        title: "Select",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:TreeSelect",
        title: "TreeSelect",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Transfer",
        title: "Transfer",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:TimePicker",
        title: "TimePicker",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Upload",
        title: "Upload",
        isContainer: false,
        schema: {}
      }
    ]
  },
  {
    id: "data-display", // prefix
    title: "Data Display",
    children: [
      {
        component: "antd:Avatar",
        title: "Avatar",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Badge",
        title: "Badge",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Comment",
        title: "Comment",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Collapse",
        title: "Collapse",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:Carousel",
        title: "Carousel",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:Card",
        title: "Card",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:Calendar",
        title: "Calendar",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Descriptions",
        title: "Descriptions",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Empty",
        title: "Empty",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:List",
        title: "List",
        isContainer: true,
        schema: {}
      },
      {
        component: "antd:Popover",
        title: "Popover",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Statistic",
        title: "Statistic",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Tree",
        title: "Tree",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Tooltip",
        title: "Tooltip",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Timeline",
        title: "Timeline",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Tag",
        title: "Tag",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Tabs",
        title: "Tabs",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Table",
        title: "Table",
        preview: "https://image.flaticon.com/icons/svg/25/25617.svg",
        isContainer: false,
        schema: {}
      }
    ]
  },
  {
    id: "feedback", // prefix
    title: "Feedback",
    children: [
      {
        component: "antd:Alert",
        title: "Alert",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Drawer",
        title: "Drawer",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Modal",
        title: "Modal",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Message",
        title: "Message",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Notification",
        title: "Notification",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Progress",
        title: "Progress",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Popconfirm",
        title: "Popconfirm",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Result",
        title: "Result",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Spin",
        title: "Spin",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Skeleton",
        title: "Skeleton",
        isContainer: false,
        schema: {}
      }
    ]
  },
  {
    id: "other", // prefix
    title: "Other",
    children: [
      {
        component: "antd:Anchor",
        title: "Anchor",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:BackTop",
        title: "BackTop",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:ConfigProvider",
        title: "ConfigProvider",
        isContainer: false,
        schema: {}
      },
      {
        component: "antd:Divider",
        title: "Divider",
        isContainer: false,
        schema: {}
      }
    ]
  }
];
