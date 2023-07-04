import http from 'node:http'
import { router } from './router'
import { defaultPort, serverListenMessage } from './const'

const port = process.env.PORT ? Number(process.env.PORT) : defaultPort

const server = http.createServer(router)

server.listen(port, () => {
  console.info(`${serverListenMessage}: ${port}`)
})
