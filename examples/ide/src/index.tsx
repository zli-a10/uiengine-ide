import React from 'react'
import ReactDOM from 'react-dom'

// import App from "./App";
import config from './config'
import { UIEngineRegister } from 'uiengine'

import { IDEEditor, IDERegister } from 'uiengine-ide'
import * as serviceWorker from './serviceWorker'
import components from './component'
import * as plugins from './plugins'
import * as listeners from './listeners'
import configLayoutWrappers from './config/wrappers'
import { MockJSConverter } from './utils/MockJSConverter'
import websocketOptions from './config/websocket'
import './index.less'

UIEngineRegister.registerComponents(components)
UIEngineRegister.registerPlugins(plugins)
UIEngineRegister.registerListeners(listeners)

IDERegister.registerSchemaConverter(MockJSConverter)
IDERegister.registerWebsocket(websocketOptions)
IDERegister.registerLayoutComponentWrapper(configLayoutWrappers)

// hack headers on request
if (localStorage.token) {
  config.requestConfig.headers['Authorization'] = `A10 ${localStorage.token}`
  console.log(config)
}

// a sandbox schema
const sandbox: any = {
  component: 'div',
  props: {
    className: 'sandbox'
  },
  children: [
    {
      component: 'h1',
      content: 'Sandbox'
    },
    {
      component: 'p',
      content:
        'Please Drag and Drop an element from left Components tab, and then try to edit it on prop window.'
    }
  ]
}

ReactDOM.render(
  <IDEEditor
    layouts={[{ layout: sandbox, workingMode: { mode: 'new' } }]}
    config={config}
  />,
  document.getElementById('root')
)

serviceWorker.unregister()
