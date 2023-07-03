export const defaultPort = 4000
export const apiPrefix = 'api'
export const usersPrefix = 'users'
export const serverListenMessage = 'Server is running and listening on port'
export const deleteMessage = 'The user has been deleted. UserId'

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ErrorMessages {
  BAD_REQUEST = 'Request does not contain required fields',
  BAD_REQUEST_ID = 'Request does not contain userId or it is not correct',
  NOT_FOUND = 'Requests to non-existing endpoints',
  NOT_FOUND_ID = 'User with this userId does not exist',
  INTERNAL_SERVER_ERROR = 'Unable to process request correctly',
}
