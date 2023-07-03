import { apiPrefix, usersPrefix } from './const'

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
