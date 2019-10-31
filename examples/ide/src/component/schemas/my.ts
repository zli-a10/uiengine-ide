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
        isContainer: true,
        schema: {},
        defaultProps: {
          isTable: true
        },
        children: [
          {
            component: "my:Table.TrGroup",
            title: "Row Group",
            isContainer: true,
            schema: {},
            defaultProps: {}
          },
          {
            component: "my:Table.Tr",
            title: "Row",
            isContainer: true,
            schema: {
              datasource: "datasource"
            },
            defaultProps: {}
          },
          {
            component: "my:Table.Td",
            title: "Column",
            isContainer: true,
            schema: {
              title: "string",
              width: "string",
              datasource: "datasource",
              actions: [
                {
                  delete: "string",
                  add: "string"
                }
              ]
            },
            defaultProps: {}
          },
          {
            component: "my:Table.CellContent",
            title: "Cell Content",
            isContainer: false,
            schema: {
              text: "string",
              datasource: "datasource"
            },
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
          events: ["onChange"]
        }
      }
    ]
  }
];
