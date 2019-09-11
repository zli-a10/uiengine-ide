import React from "react";
import ReactDOM from "react-dom";

// import App from "./App";
import config from "./config";
import { UIEngineRegister } from "uiengine";

import { IDEEditor, IDERegister } from "uiengine-ide";
import * as serviceWorker from "./serviceWorker";
import components from "./component";
import * as plugins from "./plugins";
import { getDataSourceJson } from "./utils/dataSource";
import { expandDataSource } from "./utils/schema";
import { MockJSConverter } from "./utils/MockJSConverter";
import "./index.less";
UIEngineRegister.registerComponents(components);
UIEngineRegister.registerPlugins(plugins);
IDERegister.registerSchemaConverter(MockJSConverter);

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
