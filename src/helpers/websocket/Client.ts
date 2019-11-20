import MyWebsocket from 'isomorphic-ws'
import _ from 'lodash'
import { IDERegister } from '../IDERegister'

export class Client {
  static connect(command?: IWebsocketCommands) {
    const socketOptions: IServerOptions = IDERegister.websocketOptions
    let port = _.get(socketOptions, 'port', 3001)
    let host = _.get(socketOptions, 'host', 'localhost')
    const socket: any = new MyWebsocket(`ws://${host}:${port}/`)
    if (command) {
      socket.onopen = () => {
        socket.send(JSON.stringify(command))
      }
    }
    const promise = new Promise((resolve: any, reject: any) => {
      socket.onmessage = (event: any) => {
        if (event) {
          // call onResponse
          try {
            resolve(JSON.parse(event.data))
          } catch (e) {
            resolve(event.data)
          }
        }
        socket.close()
      }

      socket.onerror = (e: any) => {
        reject(e)
      }
    })

    return promise
  }
}
