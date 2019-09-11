export default [
  {
    id: "general", // prefix
    title: "General",
    children: [
      {
        component: "my:Section",
        title: "My Section",
        isContainer: true,
        schema: {
          active: "boolean",
          title: "string"
        },
        defaultProps: {
          active: true,
          title: "Section 1"
        }
      },
      {
        component: "my:DataSelect",
        title: "My DataSelect",
        isContainer: false,
        schema: {
          active: "boolean",
          title: "string"
        },
        defaultProps: {
          active: true,
          title: "DataSelect 1"
        }
      },
      {
        component: "my:FormItem",
        title: "My FormItem",
        isContainer: true,
        schema: {
          type: "string",
          label: "string"
        },
        defaultProps: {
          active: true,
          title: "FormItem 1"
        }
      },
      {
        component: "my:Modal",
        title: "My Modal",
        isContainer: true,
        schema: {
          active: "boolean",
          title: "string"
        },
        defaultProps: {
          active: true,
          title: "Modal 1"
        }
      }
    ]
  }
];
