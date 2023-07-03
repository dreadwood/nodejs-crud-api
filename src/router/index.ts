import { type IncomingMessage, type ServerResponse } from 'node:http'
import { validate as uuidValidate } from 'uuid'
import { ErrorMessages, StatusCode } from '../const'
import { checkRoute, normalizeUrl } from '../utils'

export const router = async (req: IncomingMessage, res: ServerResponse) => {
  if (typeof req.url !== 'string') {
    return
  }

  const url = normalizeUrl(req.url)
  const urlPaths = url.split('/')

  if (!checkRoute(urlPaths)) {
    res.writeHead(StatusCode.BAD_REQUEST, {
      'Content-Type': 'application/json',
    })
    res.end(
      JSON.stringify({
        error: ErrorMessages.BAD_REQUEST,
      })
    )
    return
  }

  const userId = urlPaths[2]

  if (userId && !uuidValidate(userId)) {
    res.writeHead(StatusCode.BAD_REQUEST, {
      'Content-Type': 'application/json',
    })
    res.end(
      JSON.stringify({
        error: ErrorMessages.BAD_REQUEST_ID,
      })
    )
    return
  }

  if (typeof req.method !== 'string') {
    return
  }

  try {
    console.log('Handlers for endpoints will be here')
  } catch (error) {
    res.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
      'Content-Type': 'application/json',
    })
    res.end(
      JSON.stringify({
        error: ErrorMessages.INTERNAL_SERVER_ERROR,
      })
    )
  }
}
