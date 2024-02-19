import { Response, NextFunction } from 'express'
import { RPCError, ParsedRequest } from '../types/types'

export function parseRequest(
  req: ParsedRequest,
  res: Response,
  next: NextFunction,
) {
  if (
    req.body.jsonrpc !== undefined ||
    req.body.method !== undefined ||
    req.body.params !== undefined ||
    req.body.id !== undefined
  ) {
    const { jsonrpc, method, params, id } = req.body
    req.rpcRequest = { jsonrpc, method, params, id }
    next()
    return
  }
  const error: RPCError = {
    code: 7979,
    message: 'Bad response format',
    data: '405 Not Allowed',
  }
  revertWithError(res, 405, error)
}

export function revertWithError(
  res: Response,
  statusCode: number,
  error: RPCError,
) {
  res.status(statusCode).send(
    JSON.stringify({
      jsonrpc: '2.0',
      id: 0,
      error,
    }),
  )
}
