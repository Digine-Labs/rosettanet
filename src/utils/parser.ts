import { Response, NextFunction } from 'express'
import { ParsedRequest, RPCError } from '../types/types'

export function parseRequest(
  req: ParsedRequest,
  res: Response,
  next: NextFunction,
) {
  if (req.body.jsonrpc && req.body.method && req.body.params && req.body.id) {
    // TODO: Also validate types
    const { jsonrpc, method, params, id } = req.body
    req.rpcRequest = { jsonrpc, method, params, id }
    next()
    return
  }
  const error: RPCError = {
    jsonrpc: req.body.jsonrpc,
    id: req.body.id,
    error: {
      code: 405,
      message: 'Bad request format, 405 Not Allowed',
    },
  }

  revertWithError(res, 405, error)
}

export function revertWithError(
  res: Response,
  statusCode: number,
  error: RPCError,
) {
  res.status(statusCode).send({
    jsonrpc: '2.0',
    id: 0,
    error,
  })
}
