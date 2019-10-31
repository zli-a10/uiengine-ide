import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'
import Commander from './Commander'

const app = express()

//initialize a simple http server
const server = http.createServer(app)

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', async (message: string) => {
    const result = await Commander.executeCommand(message)
    ws.send(result)
  })
})

//start our server
server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${process.env.PORT || 3001} :)`)
})
