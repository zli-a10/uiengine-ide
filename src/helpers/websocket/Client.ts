import MyWebsocket from "isomorphic-ws";
import _ from "lodash";
import commands from "./commands";
import { IDERegister } from "../IDERegister";

export class Client implements IClient {
  static instance: IClient;
  static getInstance() {
    if (!Client.instance) {
      Client.instance = new Client();
    }
    return Client.instance;
  }

  public ws: any;

  connect(command: string) {
    const options: IServerOptions = IDERegister.websocketOptions;
    let port = _.get(options, "port", 8080);
    let host = _.get(options, "host", "localhost");
    this.ws = new MyWebsocket(`wss://${host}:${port}/`);
    this.ws.onmessage = this.onMessage;
    this.ws.onopen = this.onOpen(command);
    this.ws.onclose = this.onClose;
  }

  private executeCommand(socketCommands: IWebsocketCommands) {
    const { name } = socketCommands;
    if (commands[name]) {
      const { data, client } = commands[name];
      if (_.isFunction(client)) return client(data);
    }
  }

  onMessage(socketCommands: IWebsocketCommands) {
    this.executeCommand(socketCommands);
  }

  onOpen(command: string) {
    const commandOptions = {
      name: command,
      options: _.get(commands, `command.options`, {})
    };
    return () => {
      this.ws.send(commandOptions);
    };
  }

  onClose() {
    console.log("disconnected");
  }
}
