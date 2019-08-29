export default [
  {
    id: "general", // prefix
    title: "General",
    children: [
      {
        component: "antd:Icon",
        title: "Icon",
        schema: {}
      },
      {
        component: "antd:Typography",
        title: "Typography",
        schema: {}
      },
      {
        component: "antd:Button",
        title: "Button",
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
        schema: {
          gutter: {
            types: ["xs", "sm", "md"],
            range: [1, 24]
          },
          align: {
            default: "top",
            options: ["top", "middle", "bottom"]
          },
          justify: {
            options: ["start", "end", "center", "space-around", "space-between"]
          }
        }
      },
      {
        component: "antd:Col",
        title: "Column",
        schema: {
          span: [1, 24],
          type: ["xs", "sm", "md", "lg", "xl", "xxl"],
          offset: "number"
        }
      },
      {
        component: "antd:Layout",
        title: "Layout",
        schema: {}
      },
      {
        component: "antd:Layout.Header",
        title: "Header",
        schema: {}
      },
      {
        component: "antd:Layout.Footer",
        title: "Footer",
        schema: {}
      },
      {
        component: "antd:Layout.Sider",
        title: "Sider",
        schema: {}
      },
      {
        component: "antd:Content",
        title: "Content",
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
        schema: {}
      },
      {
        component: "antd:Breadcrumb",
        title: "Breadcrumb",
        schema: {}
      },
      {
        component: "antd:Breadcrumb.Item",
        title: "B.Item",
        schema: {}
      },
      {
        component: "antd:Breadcrumb.Separator",
        title: "B.Separator",
        schema: {}
      },
      {
        component: "antd:Dropdown",
        title: "Dropdown",
        schema: {}
      },
      {
        component: "antd:Dropdown.Button",
        title: "D.Button",
        schema: {}
      },
      {
        component: "antd:Menu",
        title: "M.Item",
        schema: {}
      },
      {
        component: "antd:Menu.SubMenu",
        title: "M.SubMenu",
        schema: {}
      },
      {
        component: "antd:Menu.ItemGroup",
        title: "M.ItemGroup",
        schema: {}
      },
      {
        component: "antd:Menu.Divider",
        title: "M.Divider",
        schema: {}
      },
      {
        component: "antd:Pagination",
        title: "Pagination",
        schema: {}
      },
      {
        component: "antd:PageHeader",
        title: "PageHeader",
        schema: {}
      },
      {
        component: "antd:Steps",
        title: "Steps",
        schema: {}
      },
      {
        component: "antd:Steps.Step",
        title: "Steps.Step",
        schema: {}
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
        schema: {
          layout: ["horizontal", "vertical", "inline"],
          labelAlign: ["left", "right"],
          labelCol: {
            sm: {
              span: "number",
              offset: "number"
            }
          },
          hideRequiredMark: "boolean"
        }
      },
      {
        component: "antd:Form.Item",
        title: "F.Item",
        schema: {
          extra: {
            help: "string"
          },
          label: "string",
          labelCol: {
            sm: {
              span: "number",
              offset: "number"
            }
          },
          required: "boolean",
          htmlFor: "string",
          hasFeedback: "boolean"
        },
        defaultProps: {
          label: "Lable Name",
          required: true
        }
      },
      {
        component: "antd:Input",
        title: "Input",
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
        schema: {}
      },
      {
        component: "antd:Checkbox",
        title: "Checkbox",
        schema: {}
      },
      {
        component: "antd:Cascader",
        title: "Cascader",
        schema: {}
      },
      {
        component: "antd:DataPicker",
        title: "DataPicker",
        schema: {}
      },
      {
        component: "antd:InputNumber",
        title: "InputNumber",
        schema: {}
      },
      {
        component: "antd:Mentions",
        title: "Mentions",
        schema: {}
      },
      {
        component: "antd:Rate",
        title: "Rate",
        schema: {}
      },
      {
        component: "antd:Radio",
        title: "Radio",
        schema: {}
      },
      {
        component: "antd:Switch",
        title: "Switch",
        schema: {}
      },
      {
        component: "antd:Sider",
        title: "Sider",
        schema: {}
      },
      {
        component: "antd:Select",
        title: "Select",
        schema: {}
      },
      {
        component: "antd:TreeSelect",
        title: "TreeSelect",
        schema: {}
      },
      {
        component: "antd:Transfer",
        title: "Transfer",
        schema: {}
      },
      {
        component: "antd:TimePicker",
        title: "TimePicker",
        schema: {}
      },
      {
        component: "antd:Upload",
        title: "Upload",
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
        schema: {}
      },
      {
        component: "antd:Badge",
        title: "Badge",
        schema: {}
      },
      {
        component: "antd:Comment",
        title: "Comment",
        schema: {}
      },
      {
        component: "antd:Collapse",
        title: "Collapse",
        schema: {}
      },
      {
        component: "antd:Carousel",
        title: "Carousel",
        schema: {}
      },
      {
        component: "antd:Card",
        title: "Card",
        schema: {}
      },
      {
        component: "antd:Calendar",
        title: "Calendar",
        schema: {}
      },
      {
        component: "antd:Descriptions",
        title: "Descriptions",
        schema: {}
      },
      {
        component: "antd:Empty",
        title: "Empty",
        schema: {}
      },
      {
        component: "antd:List",
        title: "List",
        schema: {}
      },
      {
        component: "antd:Popover",
        title: "Popover",
        schema: {}
      },
      {
        component: "antd:Statistic",
        title: "Statistic",
        schema: {}
      },
      {
        component: "antd:Tree",
        title: "Tree",
        schema: {}
      },
      {
        component: "antd:Tooltip",
        title: "Tooltip",
        schema: {}
      },
      {
        component: "antd:Timeline",
        title: "Timeline",
        schema: {}
      },
      {
        component: "antd:Tag",
        title: "Tag",
        schema: {}
      },
      {
        component: "antd:Tabs",
        title: "Tabs",
        schema: {}
      },
      {
        component: "antd:Table",
        title: "Table",
        preview: "https://image.flaticon.com/icons/svg/25/25617.svg",
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
        schema: {}
      },
      {
        component: "antd:Drawer",
        title: "Drawer",
        schema: {}
      },
      {
        component: "antd:Modal",
        title: "Modal",
        schema: {}
      },
      {
        component: "antd:Message",
        title: "Message",
        schema: {}
      },
      {
        component: "antd:Notification",
        title: "Notification",
        schema: {}
      },
      {
        component: "antd:Progress",
        title: "Progress",
        schema: {}
      },
      {
        component: "antd:Popconfirm",
        title: "Popconfirm",
        schema: {}
      },
      {
        component: "antd:Result",
        title: "Result",
        schema: {}
      },
      {
        component: "antd:Spin",
        title: "Spin",
        schema: {}
      },
      {
        component: "antd:Skeleton",
        title: "Skeleton",
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
        schema: {}
      },
      {
        component: "antd:BackTop",
        title: "BackTop",
        schema: {}
      },
      {
        component: "antd:ConfigProvider",
        title: "ConfigProvider",
        schema: {}
      },
      {
        component: "antd:Divider",
        title: "Divider",
        schema: {}
      }
    ]
  }
];
