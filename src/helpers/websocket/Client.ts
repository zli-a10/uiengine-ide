import MyWebsocket from "isomorphic-ws";
import _ from "lodash";
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

  connect(command?: IWebsocketCommands) {
    const socketOptions: IServerOptions = IDERegister.websocketOptions;
    let port = _.get(socketOptions, "port", 3001);
    let host = _.get(socketOptions, "host", "localhost");
    this.ws = new MyWebsocket(`ws://${host}:${port}/`);
    if (command) {
      this.ws.onopen = () => {
        this.ws.send(JSON.stringify(command));
      };
    }
    const promise = new Promise((resolve: any, reject: any) => {
      this.ws.onmessage = (event: any) => {
        if (event) {
          // call onResponse
          try {
            resolve(JSON.parse(event.data));
          } catch (e) {
            resolve(event.data);
          }
        }
      };

      this.ws.onerror = (e: any) => {
        reject(e);
      };
    });

    return promise;
  }
}
