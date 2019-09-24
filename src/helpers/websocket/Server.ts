import MyWebSocket from "ws";
import _ from "lodash";

import commands from "./commands";
import { IDERegister } from "../IDERegister";

export class Server implements IServer {
  static instance: IServer;
  static getInstance() {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  public wss: any; //WebSocket server
  public ws: MyWebSocket = {} as MyWebSocket;

  open() {
    const options: IServerOptions = IDERegister.websocketOptions;
    let port = _.get(options, "port", 8080);
    if (!this.wss) {
      this.wss = new MyWebSocket.Server({ port });
      this.wss.on("connection", this.onConnect);
    }
  }

  private executeCommand(socketCommands: IWebsocketCommands) {
    const { name } = socketCommands;
    if (commands[name]) {
      const { options, server } = commands[name];
      if (_.isFunction(server)) return server(options); // the server callback should fill the "response field"
    }
  }

  onMessage(socketCommands: IWebsocketCommands) {
    this.wss.clients.forEach((client: any) => {
      if (client.readyState === WebSocket.OPEN) {
        const data = this.executeCommand(socketCommands);
        socketCommands.response = data;
        client.send(socketCommands);
      }
    });
  }

  onConnect(ws: any) {
    this.ws = ws;
    this.ws.on("message", this.onMessage);
  }
}
