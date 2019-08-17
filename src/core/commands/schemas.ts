import schemaCommands from '../messages/schemas';

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

export default {
  [get_schemas]: { // support search
    status: 200,
    output: {
      start: 0,
      offset: 100,
      total: 10001,
      children: [
        {
          type: 'page', name: 'waf-home', app: 'WAF', title: 'Home',
          platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git',
          children: [
            { type: 'page', name: 'waf-list', title: 'List', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' },
            { type: 'page', name: 'waf-template', title: 'WAF Template', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' },
            { type: 'page', name: 'waf-dashboard', title: 'WAF Dashboard', app: 'WAF Dashboard', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' },
            {
              type: 'page', name: 'waf-form', title: 'WAF FORM1', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git',
              children: [
                { type: 'page', name: 'waf-list1', title: 'List', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' },
                { type: 'page', name: 'waf-template2', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' },
                { type: 'page', name: 'waf-dashboard3', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' },
                { type: 'page', name: 'waf-form4', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' }
              ]
            }
          ]
        }
      ]
    }
  },
  [get_schema_info]: {
    status: 200,
    output: { type: 'page', name: 'waf-form', title: 'Table1', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' }
  },
  [get_schema_outline]: {
    status: 200,
    output: {
      version: '1.0',
      name: 'waf-form',
      title: 'Template Form',
      children: [
        {
          component: 'AutoForm',
          name: 'autoform-1',
          children: [
            {
              component: 'Section', name: 'basic-section', children: [
                { component: 'InputField', name: 'virtual-server-name' },
                { component: 'IpField', name: 'ipv4-address' }
              ]
            },
            {
              component: 'Advance', name: 'advance-section', children: [
                { component: 'InputField', name: 'virtual-server-template' },
                { component: 'ConfigList', name: 'acl-list' }
              ]
            }
          ]
        }
      ]
    }
  },
  [add_schema]: {
    status: 200,
    output: { type: 'page', name: 'waf-form-2', title: 'WAF-TEST-FORM', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' }
  },
  [delete_schema]: {
    status: 200
  },
  [rename_schema]: {
    status: 200,
    output: { type: 'page', name: 'waf-form-3', title: 'WAF-RENAMED-FORM', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' }
  },
  [clone_schema]: {
    status: 200,
    output: { type: 'page', name: 'waf-form-4', title: 'WAF-CLONED-FORM', app: 'WAF', platform: 'acos', version: '1.0', author: 'Zuoping', url: 'wiz-ide.git' }
  },
  [get_layouts]: {
    status: 200,
    output: [
      {
        version: '1.1',
        url: 'widgets-layout.git',
        author: 'rui',
        title: 'Component Layout',
        children: [
          {
            category: 'page', // data-entry, layout, autoform
            author: 'Rui',
            title: '2-columns',
            data: '2-columns.json'
          },
          {
            category: 'navigation',
            author: 'Rui',
            title: '2-rows',
            data: '2-rows.json'
          }
        ]
      },
      {
        version: '1.1',
        url: 'page-layout.git',
        author: 'chris',
        title: 'Page Layout',
        children: [
          {
            category: 'widget',
            author: 'Jason',
            title: '2-columns',
            data: '2-columns.json',
            icon: 'xxx.svg', // default we don't provide, we use the component-name.svg/icon
            preview: 'xx.png'
          },
          {
            category: 'container',
            author: 'Rui',
            title: '2-rows',
            data: '2-rows.json'
          }
        ]
      }
    ]
  }
};
