import http from 'node:http'
import { defaultPort, serverListenMessage } from './const'

const port = process.env.PORT ? Number(process.env.PORT) : defaultPort

const server = http.createServer()

server.listen(port, () => {
  console.info(`${serverListenMessage}: ${port}`)
})
