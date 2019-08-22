import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
// import App from "./App";
import config from "./config";
import { UIEngineRegister } from "uiengine";

import { IDEEditor } from "uiengine-ide";
import * as serviceWorker from "./serviceWorker";

import components from "./component";
import plugins from "./plugins";

UIEngineRegister.registerComponents(components);
UIEngineRegister.registerPlugins(plugins);

ReactDOM.render(
  <IDEEditor layouts={["schema/ui/simple.json"]} config={config} />,
  document.getElementById("root")
);

serviceWorker.unregister();
