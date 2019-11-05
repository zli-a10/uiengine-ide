import * as _ from 'lodash'
import * as commands from './websocket'
import { IObject } from 'uiengine/typings'

export const loadDataSource = async (options: IObject = {}) => {
  const data = (await commands.loadDataSource(options)) as IObject[]
  return data
}

const getDataSource = (
  dataTree: IObject[],
  keys: string[],
  fileName: string
): IObject[] => {
  const [firstKey, ...otherKeys] = keys
  const existItem = _.find(dataTree, (item: IObject) => {
    return item.name === firstKey
  }) as { name: string; children: IObject[]; files: string[] }
  if (!existItem) {
    dataTree.push({
      name: firstKey,
      component: 'antd:Col',
      files: [fileName],
      type: 'file',
      ...(otherKeys.length > 0
        ? { children: getDataSource([], otherKeys, fileName) }
        : {})
    })
  } else {
    if (otherKeys.length > 0) {
      existItem.children = getDataSource(
        existItem.children || [],
        otherKeys,
        fileName
      )
      existItem.files = [fileName, ...existItem.files]
    }
  }
  return dataTree
}

export const analysisDataSource = (dataSource: IObject[]) => {
  let dataTree = [] as IObject[]
  dataSource.map((item: IObject) => {
    const { name } = item
    const nameKeys = _.split(_.replace(name, '.json', ''), '.')
    dataTree = getDataSource(dataTree, nameKeys, name)
  })

  return dataTree
}

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

const getUiSchema = (field: any) => {
  const source = _.replace(
    field['cm-lineage'],
    `.${field.key}`,
    `:${field.key}`
  )
  return {
    type: 'field',
    name: field.key,
    datasource: { source },
    uiSchema: {
      component: 'antd:Form.Item',
      datasource: { source },
      props: {
        label: field.label
      },
      children: [
        {
          component: getFieldComponent(field),
          ...(Array.isArray(field.fields)
            ? {
                children: field.fields.map((subField: any) => {
                  return getUiSchema(subField)
                })
              }
            : {})
        }
      ]
    }
  }
}

const getTopSchema = (fields: any[]) => {
  return {
    component: 'antd:Col',
    // datasource: { source: '' },
    children: fields.map((field: any) => {
      return getUiSchema(field)
    })
  }
}

const getFieldDataSource = (field: any) => {
  const source = _.replace(
    field['cm-lineage'],
    `.${field.key}`,
    `:${field.key}`
  )
  return {
    component: getFieldComponent(field),
    datasource: { source }
  }
}

export const expandDataSource = (schema: IObject) => {
  console.log('=asdfasdfasdf', schema)
  const analysisFields = (fields: any[]): any[] => {
    return fields.map((field: any) => {
      return {
        type: 'field',
        name: field.key,
        component: 'antd:Form.Item',
        props: { label: field.label },
        children: [
          {
            component: getFieldComponent(field),
            datasource: { source: field['cm-lineage'] }
          }
        ]
      }
    })
  }

  const sources = analysisFields(schema.fields || [])
  const topUiSchema = getTopSchema(schema.fields || [])
  return [sources, topUiSchema]
}
export const analysisDataSourceFields = (schema: IObject) => {
  const [sources, topUiSchema] = expandDataSource(schema)
  console.log('===L:>>', sources)
  return [sources, topUiSchema]
}
