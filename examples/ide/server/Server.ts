import * as WebSocket from 'ws'
import { uniqueId } from 'lodash'
import Commander from './Commander'

class WebSocketServer {
  static wss: any
  ws: any = {
    'client-listener': null,
    request: null
  }

  constructor(server: any) {
    //initialize the WebSocket server instance
    if (!WebSocketServer.wss) {
      WebSocketServer.wss = new WebSocket.Server({ server })
      this.connect()
    }
  }

  connect(message?: any) {
    WebSocketServer.wss.on('connection', (ws: WebSocket) => {
      console.log('socket opened2')
      // const id = uniqueId('socket-')
      ws.on('message', async (message: string) => {
        console.log(message)
        const command = JSON.parse(message)
        this.ws[command.socketName] = ws
        const result = await Commander.executeCommand(command)
        ws.send(result)
      })

      ws.on('close', () => {
        console.log('socket closed')
      })

      if (message) {
        ws.send(message)
      }
    })
  }

  sendMessage(message: any, socketName: string) {
    if (this.ws[socketName]) {
      this.ws[socketName].send(message)
    } else {
      this.connect(message)
    }
  }
}

export default WebSocketServer
