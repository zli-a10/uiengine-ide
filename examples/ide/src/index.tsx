import React from 'react'
import ReactDOM from 'react-dom'
import * as _ from 'lodash'
import './index.less'
// import App from "./App";
import config from './config'
import { UIEngineRegister } from 'uiengine'

import { IDEEditor } from 'uiengine-ide'
import * as serviceWorker from './serviceWorker'
import components from './component'
import plugins from './plugins'
import { getSchema } from './utils/request'
import { getDataSourceJson } from './utils/dataSource'
UIEngineRegister.registerComponents(components)
UIEngineRegister.registerPlugins(plugins)

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

const expandDataSource = async (uiJson: string) => {
  const schema = (await getSchema('schema/json/schema.json')) || { fields: [] }
  const analysisFields = (fields: any[]): any[] => {
    return fields.map((field: any) => {
      return {
        type: 'field',
        name: field.label,
        children: field.fields ? analysisFields(field.fields) : null,
        uiSchema: getUiSchema(field)
      }
    })
  }
  const sources = analysisFields(schema.fields || [])
  return sources
}

ReactDOM.render(
  <IDEEditor
    layouts={['schema/ui/simple.json']}
    config={config}
    manangerProps={{
      getDataSource: getDataSourceJson,
      expandDataSource
    }}
  />,
  document.getElementById('root')
)

serviceWorker.unregister()
