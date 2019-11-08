// import MyWebsocket from 'isomorphic-ws'
import _ from 'lodash'
import { IDERegister } from '../IDERegister'

export class WebsocketClient {
  static instance: WebsocketClient
  static getInstance() {
    if (!WebsocketClient.instance) {
      WebsocketClient.instance = new WebsocketClient()
    }
    return WebsocketClient.instance
  }
  socket: any = {}

  async open(id: string) {
    const socketOptions: IServerOptions = IDERegister.websocketOptions
    let port = _.get(socketOptions, 'port', 3001)
    let host = _.get(socketOptions, 'host', 'localhost')
    const url = `ws://${host}:${port}/`

    const promise = new Promise((resolve: any, reject: any) => {
      // keep one instance for socket
      if (!this.socket[id]) {
        this.socket[id] = new WebSocket(url)
        this.socket[id].onopen = () => {
          resolve(true)
        }

        this.socket[id].onclose = () => {}

        this.socket[id].onerror = (e: any) => {
          reject(e)
        }
      } else {
        const retry = () => {
          if (this.socket[id].readyState !== 1) {
            _.delay(retry, 500)
          } else {
            resolve(true)
          }
        }
        retry()
      }
    })
    return promise
  }

  getResponse(id: string) {
    const promise = new Promise((resolve: any, reject: any) => {
      this.socket[id].onmessage = (event: any) => {
        if (event) {
          // call onResponse
          try {
            const data = JSON.parse(event.data)
            resolve(data)
          } catch (e) {
            resolve({ command: {}, value: event.data })
          }
        }
      }
    })
    return promise
  }

  async send(command: IWebsocketCommands) {
    const id = 'request'
    await this.open(id)
    if (command) {
      command.socketName = id
      this.socket[id].send(JSON.stringify(command))
    }
    const response = await this.getResponse(id)
    return _.get(response, 'value')
  }

  async listen() {
    // don't change, backend use same key to listen
    const id = 'client-listener'
    await this.open(id)
    const response: any = await this.getResponse(id)
    // const { command, value } = response
    // console.log(command, value)
    return response
  }
}
