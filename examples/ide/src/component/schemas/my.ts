// import _ from "lodash";
export default [
  {
    id: 'common', // prefix
    title: 'Project Common Components',
    children: [
      {
        component: 'my:Provider',
        title: 'Provider',
        isContainer: true,
        schema: {
          state: 'string'
        },
        defaultProps: {
          state: "{value1: 'abc'}"
        }
      },
      {
        component: 'my:Layout.Row',
        title: 'Row',
        isContainer: true,
        schema: {},
        children: [
          {
            component: 'my:Layout.Col',
            title: 'Col',
            isContainer: true,
            schema: {},
            defaultProps: {}
          }
        ],
        defaultProps: {}
      },
      {
        component: 'my:Form.Form',
        title: 'Form',
        isContainer: true,
        schema: {
          state: 'string'
        },
        children: [
          {
            component: 'my:Form.Section',
            title: 'Section',
            isContainer: true,
            schema: {
              active: 'boolean',
              title: 'string'
            },
            defaultProps: {
              active: true,
              title: 'Section 1'
            }
          },
          {
            component: 'my:Form.DataSelect',
            title: 'DataSelect',
            isContainer: false,
            schema: {
              datasource: 'datasource',
              optionmap: [{ title: 'string' }, { value: 'string' }],
              open: 'boolean',
              events: [
                'onChange',
                'onBlur',
                'onDeselect',
                'onFocus',
                'onInputKeyDown',
                'onMouseEnter',
                'onMouseLeave',
                'onSearch',
                'onSelect',
                'onDropdownVisibleChange'
              ]
            }
          },
          {
            component: 'my:Form.FormItem',
            title: 'FormItem',
            isContainer: false,
            schema: {
              type: 'component',
              label: 'string',
              extra: 'string',
              labelCol: [
                {
                  span: [1, 24],
                  offset: [1, 24]
                }
              ],
              required: 'boolean',
              htmlFor: 'string',
              hasFeedback: 'boolean'
            },
            defaultProps: {
              // label: `My Item ${_.uniqueId()}`
            }
          },
          {
            component: 'my:Form.FixedSelect',
            title: 'FixedSelect',
            isContainer: false,
            schema: {
              datasource: 'datasource',
              optionmap: [{ title: 'string' }, { value: 'string' }],
              open: 'boolean',
              userDefinedOptions: 'string',
              events: [
                'onChange',
                'onBlur',
                'onDeselect',
                'onFocus',
                'onInputKeyDown',
                'onMouseEnter',
                'onMouseLeave',
                'onSearch',
                'onSelect',
                'onDropdownVisibleChange'
              ]
            }
          },
          {
            component: 'my:Form.RadioGroup',
            title: 'RadioGroup',
            isContainer: true,
            schema: {
              radioOptions: 'string',
              events: ['onChange']
            },
            defaultProps: {
              radioOptions: 'Item1:1,Item2:2,Item3:3'
            }
          }
        ],
        defaultProps: {}
      },
      {
        component: 'my:Table.Table',
        title: 'Table',
        isContainer: true,
        schema: {},
        defaultProps: {
          isTable: true
        },
        children: [
          {
            component: 'my:Table.TrGroup',
            title: 'Row Group',
            isContainer: true,
            schema: {
              expandable: 'boolean'
            },
            defaultProps: {
              expandable: true
            }
          },
          {
            component: 'my:Table.Tr',
            title: 'Row',
            isContainer: true,
            schema: {
              keys: 'fieldselector'
            },
            defaultProps: {}
          },
          {
            component: 'my:Table.Td',
            title: 'Column',
            isContainer: true,
            schema: {
              title: 'string',
              width: 'string',
              colspan: 'number',
              selectAll: 'boolean'
            },
            defaultProps: {}
          },
          {
            component: 'my:Table.CellContent',
            title: 'Cell Content',
            isContainer: false,
            schema: {
              text: 'string',
              datasource: 'datasource'
            },
            defaultProps: {}
          }
        ]
      },
      {
        component: 'my:TabList',
        title: 'TabList',
        isContainer: true,
        schema: {
          maxTabs: 'number'
        },
        defaultProps: {
          maxTabs: 10,
          isTable: true
        }
      }
    ]
  }
]
