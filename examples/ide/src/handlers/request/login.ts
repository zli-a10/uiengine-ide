import _ from "lodash";

import { submitToAPI } from "uiengine";

import {
  IHandlerConfig,
  IHandler,
  IHandlerParam,
  IUINode
} from "uiengine/typings";

const handler: IHandler = async (directParam: IHandlerParam) => {
  // const event: Event = _.get(directParam, 'event')
  const uiNode: IUINode = _.get(directParam, "uiNode");
  // const props = _.get(directParam, 'props')
  const headers: any = uiNode.request.getConfig().headers;

  // const uiNode = controller.getUINode(loginLayout);
  const result = submitToAPI([{ source: "credentials" }]);
  result.then((res: any) => {
    const token = _.get(res[0], "authresponse.signature");
    if (token) {
      localStorage.setItem("token", token);
      headers["Authorization"] = `A10 ${token}`;
    }

    console.log(localStorage.getItem("token"), " token fetched");
  });
};

export const login: IHandlerConfig = {
  name: "login",
  paramKeys: ["event", "props", "uiNode"],
  // debugList: ["options.recirect"],
  debugList: [],
  handler,
  weight: 0,
  describe: {
    // options: [
    //   {
    //     redirect: 'string'
    //   }
    // ]
  }
};
