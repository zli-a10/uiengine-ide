import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
// import App from "./App";
import config from "./config";
import { UIEngineRegister } from "uiengine";

import { IDEEditor } from "uiengine-ide";
import * as serviceWorker from "./serviceWorker";
import { dataSourceJson } from "./faker/dataSource";
import components from "./component";
import plugins from "./plugins";
import schema from "./faker/schema.json";
UIEngineRegister.registerComponents(components);
UIEngineRegister.registerPlugins(plugins);

const expandDataSource = (uiJson: string) => {
  console.log("schema", schema, uiJson);
  return schema;
};

ReactDOM.render(
  <IDEEditor
    layouts={["schema/ui/simple.json"]}
    config={config}
    manangerProps={{
      getDataSource: dataSourceJson,
      expandDataSource
    }}
  />,
  document.getElementById("root")
);

serviceWorker.unregister();
