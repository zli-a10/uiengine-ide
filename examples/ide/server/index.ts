import * as express from 'express'
import * as http from 'http'
import WebSocketServer from './Server'
const fs = require('fs')

const app = express()

//initialize a simple http server
const server = http.createServer(app)

const s = new WebSocketServer(server)
// setInterval(() => {
//   s.sendMessage('hello', 'client-listener')
// }, 3000)

// fs.watch(
//   './public',
//   { encoding: 'buffer' },
//   (eventType: any, filename: any) => {
//     if (filename) {
//       console.log(filename, eventType)
//     }
//   }
// )

//start our server
server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${process.env.PORT || 3001} :)`)
})
