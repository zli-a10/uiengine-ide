import _ from "lodash";

import {
  IListenerConfig,
  IListener,
  IListenerParam,
  IUINode
} from "uiengine/typings";

const listener: IListener = async (directParam: IListenerParam) => {
  // const event: Event = _.get(directParam, "event");
  const uiNode: IUINode = _.get(directParam, "uiNode");
  const datasource = _.get(directParam, "datasource");
  // console.log(datasource, event, uiNode, directParam);
  // console.log(uiNode.dataNode.data);
  // uiNode.dataNode.deleteData(datasource);
};

export const deleteRow: IListenerConfig = {
  name: "deleteRow",
  paramKeys: ["event", "uiNode", "datasource"],
  // debugList: ["options.recirect"],
  debugList: [],
  listener,
  weight: 0,
  describe: {
    datasource: "string"
  }
};
