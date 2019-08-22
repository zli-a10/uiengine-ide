export default [
  {
    id: "layout", // prefix
    title: "Layout",
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
      }
    ]
  },
  {
    id: "antd", // prefix
    title: "Form",
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
        title: "Form Item",
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
  }
];
