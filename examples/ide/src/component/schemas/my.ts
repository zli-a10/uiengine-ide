// import _ from "lodash";
export default [
  {
    id: "My", // prefix
    title: "My Project Components",
    children: [
      {
        component: "my:Section",
        title: "Section",
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
        title: "DataSelect",
        isContainer: false,
        schema: {
          datasource: "datasource",
          optionmap: [{ title: "string" }, { value: "string" }],
          open: "boolean",
          events: [
            "onChange",
            "onBlur",
            "onDeselect",
            "onFocus",
            "onInputKeyDown",
            "onMouseEnter",
            "onMouseLeave",
            "onSearch",
            "onSelect",
            "onDropdownVisibleChange"
          ]
        }
      },
      {
        component: "my:FormItem",
        title: "FormItem",
        isContainer: false,
        schema: {
          type: "string",
          label: "string",
          extra: "string",
          labelCol: [
            {
              span: [1, 24],
              offset: [1, 24]
            }
          ],
          required: "boolean",
          htmlFor: "string",
          hasFeedback: "boolean"
        },
        defaultProps: {
          // label: `My Item ${_.uniqueId()}`
        }
      },
      {
        component: "my:Table.Table",
        title: "Table",
        isContainer: false,
        schema: {},
        defaultProps: {},
        children: [
          {
            component: "my:Table.Tr",
            title: "Row",
            isContainer: true,
            schema: {},
            defaultProps: {}
          },
          {
            component: "my:Table.Td",
            title: "Column",
            isContainer: true,
            schema: {},
            defaultProps: {}
          }
        ]
      },
      {
        component: "my:FixedSelect",
        title: "My FixedSelect",
        isContainer: false,
        schema: {
          datasource: "datasource",
          optionmap: [{ title: "string" }, { value: "string" }],
          open: "boolean",
          userDefinedOptions: "string",
          events: [
            "onChange",
            "onBlur",
            "onDeselect",
            "onFocus",
            "onInputKeyDown",
            "onMouseEnter",
            "onMouseLeave",
            "onSearch",
            "onSelect",
            "onDropdownVisibleChange"
          ]
        }
      },
      {
        component: "my:RadioGroup",
        title: "My RadioGroup",
        isContainer: true,
        schema: {
          name: "string",
          defaultValue: "string",
          value: "string",
          radioOptions: "string",
          events: [
            "onChange",
          ]
        }
      }
    ]
  }
];
