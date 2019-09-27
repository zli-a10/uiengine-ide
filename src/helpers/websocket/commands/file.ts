import _ from "lodash";
import { Client } from "../Client";

export async function getFileList(
  type: EResourceType,
  isTemplate: boolean = false
) {
  const command: IWebsocketCommands = {
    name: "getFileList",
    options: { type, isTemplate }
  };

  return await Client.connect(command);
}

export async function readFile(
  type: EResourceType,
  name: string,
  isTemplate: boolean = false
) {
  const command: IWebsocketCommands = {
    name: "readFile",
    options: { type, path: name, isTemplate }
  };

  return await Client.connect(command);
}
