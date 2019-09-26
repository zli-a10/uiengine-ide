import _ from "lodash";
import { Client } from "../Client";

export async function getFileList(type: EResourceType) {
  const client = Client.getInstance();
  const command: IWebsocketCommands = {
    name: "getFileList",
    options: { type }
  };

  return await client.connect(command);
}

export async function readFile(type: EResourceType, name: string) {
  const client = Client.getInstance();
  const command: IWebsocketCommands = {
    name: "readFile",
    options: { type, path: name }
  };

  return await client.connect(command);
}
