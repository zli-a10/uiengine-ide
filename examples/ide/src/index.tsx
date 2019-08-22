import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
// import App from "./App";
import config from "./config";
import { UIEngineRegister } from "uiengine";

import { IDEEditor, IDERegister } from "uiengine-ide";
import * as serviceWorker from "./serviceWorker";

import components from "./component";
import plugins from "./plugins";
import { antdInfo } from "./component/schemas";

UIEngineRegister.registerComponents(components);
UIEngineRegister.registerPlugins(plugins);
IDERegister.registerComponentsInfo(antdInfo);

ReactDOM.render(
  <IDEEditor layouts={["schema/ui/simple.json"]} config={config} />,
  document.getElementById("root")
);

serviceWorker.unregister();
