import _ from "lodash";

import {
  IListenerConfig,
  IListener,
  IListenerParam,
  IUINode
} from "uiengine/typings";

const listener: IListener = async (directParam: IListenerParam) => {
  const event: Event = _.get(directParam, "event");
  const uiNode: IUINode = _.get(directParam, "uiNode");
  const props = _.get(directParam, "props");
  console.log(props, uiNode);
};

export const deleteRow: IListenerConfig = {
  name: "deleteRow",
  paramKeys: ["event", "props", "uiNode"],
  // debugList: ["options.recirect"],
  debugList: [],
  listener,
  weight: 0,
  describe: {
    // options: [
    //   {
    //     redirect: 'string'
    //   }
    // ]
  }
};
