// import _ from "lodash";

import { IHandlerConfig, IHandler, IHandlerParam } from "uiengine/typings";

const handler: IHandler = async (directParam: IHandlerParam) => {
  // const event: Event = _.get(directParam, "event");
  // const uiNode: IUINode = _.get(directParam, "uiNode");
  // const datasource = _.get(directParam, "datasource");
  // console.log(datasource, event, uiNode, directParam);
  // console.log(uiNode.dataNode.data);
  // uiNode.dataNode.deleteData(datasource);
};

export const deleteRow: IHandlerConfig = {
  name: "deleteRow",
  paramKeys: ["event", "uiNode", "datasource"],
  // debugList: ["options.recirect"],
  debugList: [],
  handler,
  weight: 0,
  describe: {
    datasource: "string"
  }
};
