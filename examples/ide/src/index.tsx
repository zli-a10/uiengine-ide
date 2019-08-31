import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
// import App from "./App";
import config from "./config";
import { UIEngineRegister } from "uiengine";

import { IDEEditor } from "uiengine-ide";
import * as serviceWorker from "./serviceWorker";
import components from "./component";
import * as plugins from "./plugins";
import { getDataSourceJson } from "./utils/dataSource";
import { expandDataSource } from "./utils/schema";
UIEngineRegister.registerComponents(components);
UIEngineRegister.registerPlugins(plugins);

ReactDOM.render(
  <IDEEditor
    layouts={["schema/ui/simple.json"]}
    config={config}
    datasource={{
      getDataSource: getDataSourceJson,
      expandDataSource
    }}
  />,
  document.getElementById("root")
);

serviceWorker.unregister();
