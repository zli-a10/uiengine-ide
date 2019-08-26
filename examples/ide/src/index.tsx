import React from 'react'
import ReactDOM from 'react-dom'
import * as _ from 'lodash'
import './index.less'
// import App from "./App";
import config from './config'
import { UIEngineRegister } from 'uiengine'

import { IDEEditor } from 'uiengine-ide'
import * as serviceWorker from './serviceWorker'
import { dataSourceJson } from './faker/dataSource'
import components from './component'
import plugins from './plugins'
import schema from './faker/schema.json'
UIEngineRegister.registerComponents(components)
UIEngineRegister.registerPlugins(plugins)

const expandDataSource = (uiJson: string) => {
  console.log('schema', schema, uiJson)
  const analysisFields = (fields: any[]): any[] => {
    return fields.map((field: any) => {
      const source = _.replace(
        field['cm-lineage'],
        `.${field.key}`,
        `:${field.key}`
      )
      return {
        type: 'field',
        name: field.label,
        datasource: { source },
        children: field.fields ? analysisFields(field.fields) : null
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
      getDataSource: dataSourceJson,
      expandDataSource
    }}
  />,
  document.getElementById('root')
)

serviceWorker.unregister()
