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

ReactDOM.render(
  <IDEEditor
    layouts={[
      { layout: 'schema/ui/simple.json', workingMode: { mode: 'new' } }
    ]}
    config={config}
  />,
  document.getElementById('root')
)

serviceWorker.unregister()
