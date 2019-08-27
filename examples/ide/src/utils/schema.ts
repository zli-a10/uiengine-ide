import * as _ from 'lodash'
import { getSchema } from './request'

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
    default:
      return 'antd:Input'
  }
}

const getUiSchema = (field: any) => {
  const source = _.replace(
    field['cm-lineage'],
    `.${field.key}`,
    `:${field.key}`
  )
  return {
    component: 'antd:Form.Item',
    datasource: { source },
    props: {
      label: field.label
    },
    children: [
      {
        component: getFieldComponent(field),
        ...{
          children: Array.isArray(field.fields)
            ? field.fields.map((subField: any) => {
                return getUiSchema(subField)
              })
            : {}
        }
      }
    ]
  }
}

export const expandDataSource = async (uiJson: string) => {
  const schema = (await getSchema('schema/json/schema.json')) || { fields: [] }
  const analysisFields = (fields: any[]): any[] => {
    return fields.map((field: any) => {
      return {
        type: 'field',
        name: field.key,
        children: field.fields ? analysisFields(field.fields) : null,
        uiSchema: getUiSchema(field)
      }
    })
  }
  const sources = analysisFields(schema.fields || [])
  return sources
}
