// import _ from "lodash";

import {
  IHandlerConfig,
  IMatchModeHandler,
  IHandlerParam,
} from "uiengine/typings";

const handler: IMatchModeHandler = async (directParam: IHandlerParam) => {
  // const event: Event = _.get(directParam, "event");
  // const uiNode: IUINode = _.get(directParam, "uiNode");
  // const datasource = _.get(directParam, "datasource");
  // console.log(datasource, event, uiNode, directParam);
  // console.log(uiNode.dataNode.data);
  // uiNode.dataNode.deleteData(datasource);
};

export const deleteRow: IHandlerConfig = {
  name: "deleteRow",
  handler,
  matchMode: true,
  paramKeys: ["event", "uiNode", "datasource"],
  debugList: [],
  weight: 0,
  describe: {
    datasource: "string"
  }
};
