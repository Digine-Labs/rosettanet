import { Response, NextFunction } from 'express'
import { ParsedRequest, RPCError } from '../types/types'

function isValidJsonRpcRequest(body: ParsedRequest): boolean {
  // Validate types according to JSON-RPC 2.0 spec
  return (
    'jsonrpc' in body &&
    'method' in body &&
    'params' in body &&
    'id' in body &&
    body.jsonrpc === '2.0' &&
    typeof body.method === 'string' &&
    (body.params === null || typeof body.params === 'object') &&
    (body.id === null ||
      typeof body.id === 'string' ||
      typeof body.id === 'number')
  )
}

export function parseRequest(
  req: ParsedRequest,
  res: Response,
  next: NextFunction,
) {
  if (isValidJsonRpcRequest(req.body)) {
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
