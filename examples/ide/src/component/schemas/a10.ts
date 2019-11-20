export default [
  {
    id: 'GUI6x',
    title: 'GUI 6.x Components',
    children: [
      {
        component: 'a10:Page.Page',
        title: 'Page',
        isContainer: true,
        schema: {
          helpSwitcher: 'boolean'
        },
        defaultProps: {
          helpSwitcher: true
        },
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
              className: 'string',
              helpSwitcher: 'boolean'
            }
          },
          {
            component: 'a10:Page.Content',
            title: 'Content',
            isContainer: true,
            schema: {}
          }
        ]
      },

      {
        component: 'my:Form.Form',
        title: 'Form',
        isContainer: true,
        schema: {},
        defaultProps: {},
        children: [
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
          }
        ]
      }
    ]
  }
]
