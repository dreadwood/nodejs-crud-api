import { type IncomingMessage } from 'node:http'
import { apiPrefix, usersPrefix } from './const'

export const validationData = (data: Record<string, unknown>): boolean =>
  typeof data?.username === 'string' &&
  typeof data?.age === 'number' &&
  Array.isArray(data?.hobbies) &&
  data?.hobbies.every(hobby => typeof hobby === 'string')

export const normalizeUrl = (url: string) => url.replace(/^\/+|\/+$/g, '')

export const checkRoute = (urlPaths: string[]): boolean => {
  if (urlPaths[0] !== apiPrefix && urlPaths[1] !== usersPrefix) {
    return false
  }

  if (typeof urlPaths[3] !== 'undefined') {
    return false
  }

  return true
}

export const getReqData = async (req: IncomingMessage) =>
  new Promise((resolve, reject) => {
    try {
      let data = ''

      req.on('data', (chunk: Buffer) => {
        data += chunk.toString()
      })

      req.on('end', () => {
        resolve(data)
      })
    } catch (error) {
      reject(error)
    }
  })
