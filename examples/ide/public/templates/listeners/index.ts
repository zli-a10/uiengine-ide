import _ from "lodash";

import {
  IListenerConfig,
  IListener,
  IListenerParam,
  IUINode
} from "uiengine/typings";

const listener: IListener = (directParam: IListenerParam) => {
  // const uiNode: IUINode = _.get(directParam, 'uiNode')
  // const layout: string = _.get(directParam, 'layout')
  // const container: string = _.get(directParam, 'container')
  // if (!layout) {
  //   return false
  // }
  // const nodeController = NodeController.getInstance()
  // return nodeController.workflow.activeLayout(
  //   layout,
  //   {
  //     container,
  //     parentNode: uiNode
  //   }
  // )
};

export const loadUI: IListenerConfig = {
  name: "loadUI",
  paramKeys: ["uiNode", "layout", "container"],
  // what params you want to show on Prop window
  debugList: ["uiNode.id", "layout", "container"],
  listener,
  weight: 0,
  // describe defined your UI schema json, can be read by UIEngine IDE
  // and IDE will use it to generate editable UI at Prop Window > Events panel
  describe: {
    layout: "string",
    container: "string"
  }
};
