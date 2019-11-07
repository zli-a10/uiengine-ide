import { readFile, ICommandOptions } from './file'

const getFieldComponent = (field: any) => {
  const { type } = field
  switch (type) {
    case 'input':
      return 'antd:Input'
    case 'input-number':
      return 'antd:InputNumber'
    case 'select':
      return 'antd:Select'
    case 'dummy-object':
      return 'antd:Col'
    case 'switch':
      return 'antd:Switch'
    case 'table':
      return 'antd:Col'
    default:
      return 'antd:Input'
  }
}

const buildFields = (fields: any, fileName: string) => {
  return fields.map((field: any) => {
    const value = fileName.replace('.json', ':') + field.key
    return {
      type: 'field',
      component: 'antd:Form.Item',
      value,
      title: field.key,
      props: { label: field.label },
      datasource: { source: field['cm-lineage'] }
      // children: [
      //   {
      //     component: getFieldComponent(field),
      //     datasource: { source: field['cm-lineage'] }
      //   }
      // ]
    }
  })
}

/**
 *
 * @param options {"name": "getDataFields", "options":{ type: "datasource", "path": name }}
 */
export function getDataFields(options: ICommandOptions) {
  const content = readFile(options)
  try {
    const jsonObj = JSON.parse(content)
    return buildFields(jsonObj.fields, options.path)
  } catch (e) {
    return []
  }
}
