/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express'
import { ParsedRequest, RPCError } from '../types/types'

function isValidJsonRpcRequest(body: any): boolean {
  // Check if body exists
  if (!body) return false

  // Check required fields (jsonrpc and method are required)
  if (!('jsonrpc' in body) || !('method' in body)) return false

  // Validate jsonrpc version (must be exactly "2.0")
  if (body.jsonrpc !== '2.0') return false

  // Method must be a non-empty string
  if (typeof body.method !== 'string' || body.method.trim() === '') return false

  // Params must be an array or object if present (can be omitted)
  if ('params' in body && body.params !== null) {
    if (!Array.isArray(body.params) && typeof body.params !== 'object')
      return false
  }

  // ID validation - ID can be missing (notification), string, number, or null (but not undefined)
  // Note: Fractional numbers are allowed by spec but often not recommended
  if ('id' in body) {
    const idType = typeof body.id
    if (body.id !== null && idType !== 'string' && idType !== 'number') {
      return false
    }

    // Check for NaN or Infinity which are not valid per JSON spec
    if (
      idType === 'number' &&
      (!isFinite(body.id) || Math.floor(body.id) !== body.id)
    ) {
      return false
    }
  }

  return true
}

export function parseRequest(
  req: ParsedRequest,
  res: Response,
  next: NextFunction,
) {
  // If params not provided, pass empty array
  if (isValidJsonRpcRequest(req.body)) {
    const { jsonrpc, method, id } = req.body
    const params = req.body.params || []
    req.rpcRequest = { jsonrpc, method, params, id }
    next()
    return
  }
  const error: RPCError = {
    jsonrpc: '2.0',
    id: req.body.id ? req.body.id : null,
    error: {
      code: -32600,
      message: 'Invalid Request',
    },
  }

  revertWithError(res, 200, error)
}

export function revertWithError(
  res: Response,
  statusCode: number,
  error: RPCError,
) {
  res.status(statusCode).send(error)
}
