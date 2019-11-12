export default [
  {
    id: 'GUI6x',
    title: 'GUI 6.x Components',
    children: [
      {
        component: 'a10:Page.Page',
        title: 'Page',
        isContainer: true,
        schema: {},
        defaultProps: {},
        children: [
          {
            component: 'a10:Page.Layout',
            title: 'Layout',
            isContainer: true,
            schema: {},
            defaultProps: {}
          },
          {
            component: 'a10:Page.Header',
            title: 'Header',
            isContainer: false,
            schema: {},
            defaultProps: {}
          },
          {
            component: 'a10:Page.Footer',
            title: 'Footer',
            isContainer: false,
            schema: {},
            defaultProps: {}
          },
          {
            component: 'a10:Page.Menu',
            title: 'Menu',
            isContainer: false,
            schema: {},
            defaultProps: {}
          },
          {
            component: 'a10:Page.Breadcrumb',
            title: 'BreadCrumb',
            isContainer: false,

            schema: {
              className: 'string'
            }
          },
          {
            component: 'a10:Page.Content',
            title: 'Content',
            isContainer: true,
            schema: {}
          },
          {
            component: 'a10:Dropdown',
            title: 'Dropdown',
            isContainer: true,

            schema: {
              className: 'string'
            }
          }
        ]
      },

      {
        component: 'a10:Tabs',
        title: 'Tabs',
        isContainer: false,
        schema: {},
        defaultProps: {},
        children: [
          {
            component: 'a10:Tabs.Tab',
            title: 'Tab',
            isContainer: true,
            schema: {
              isTable: 'boolean',
              sectionName: 'string',
              activeKey: 'number',
              defaultActiveKey: 'string',
              animated: 'boolean',
              size: 'string',
              tabPosition: ['top', 'right', 'bottom', 'left'],
              type: ['line', 'card', 'editable-card'],
              events: [
                'onChange',
                'onEdit',
                'onNextClick',
                'onPrevClick',
                'onTabClick'
              ]
            },
            defaultProps: {
              type: 'line',
              isTable: false
            }
          },
          {
            component: 'a10:Tabs.TabContent',
            title: 'TabContent',
            isContainer: true,
            schema: {
              tabName: 'string'
            }
          }
        ]
      },

      {
        component: 'a10:Form.Form',
        title: 'Form',
        isContainer: true,
        schema: {
          isCreate: 'boolean',
          formName: 'string',
          fieldName: 'string',
          sectionName: 'string',
          checkedChildren: 'string',
          unCheckedChildren: 'string'
        },
        defaultProps: {
          isCreate: true
        },

        children: [
          {
            component: 'a10:Form.Section',
            title: 'Section',
            isContainer: true,
            schema: {
              active: 'boolean',
              title: 'string',
              advanceToggle: 'boolean'
            },
            defaultProps: {
              active: true,
              title: 'Section 1'
            }
          },
          {
            component: 'a10:Form.InfoCard',
            title: 'Info Card',
            isContainer: true,
            schema: {
              checkedChildren: 'string',
              unCheckedChildren: 'string',
              cardInfor: 'string',
              tipsInfor: 'string',
              className: 'string'
            },
            defaultProps: {
              unCheckedChildren: 'Default'
            }
          },

          {
            component: 'a10:Form.FormItem',
            title: 'FormItem',
            isContainer: false,
            schema: {
              type: 'string',
              label: 'string',
              extra: 'string',
              help: 'string',
              colon: 'boolean',
              labelCol: [
                {
                  span: [1, 24],
                  offset: [1, 24]
                }
              ],
              required: 'boolean',
              htmlFor: 'string',
              hasFeedback: 'boolean',
              isMore: 'boolean',
              isAdvance: 'boolean'
            },
            defaultProps: {}
          },
          {
            component: 'a10:Form.SubmitGroup',
            title: 'SubmitGroup',
            isContainer: false,
            schema: {
              content: 'string',
              disabled: 'string',
              size: ['', 'small', 'large'],
              loading: 'boolean|number',
              type: ['', 'primary', 'dashed', 'danger', 'link'],
              shape: ['', 'circle', 'round'],
              icon: 'icon',
              events: ['onClick']
            },
            defaultProps: {}
          }
        ]
      }
    ]
  }
]
