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

const nonParamMethods = [
  'eth_gasPrice',
  'eth_chainId',
  'web3_clientVersion',
  'net_version',
  'net_listening',
  'net_peerCount',
  'eth_protocolVersion',
  'eth_syncing',
  'eth_coinbase',
  'eth_mining',
  'eth_hashrate',
  'eth_accounts',
  'eth_blockNumber',
]

export function parseRequest(
  req: ParsedRequest,
  res: Response,
  next: NextFunction,
) {
  // Todo: If params not provided, pass empty array
  if (isValidJsonRpcRequest(req.body)) {
    const { jsonrpc, method, params, id } = req.body
    req.rpcRequest = { jsonrpc, method, params, id }
    next()
    return
  } else {
    const { jsonrpc, method, id } = req.body
    if (nonParamMethods.indexOf(method) > -1) {
      req.rpcRequest = { jsonrpc, method, params: [], id }
      next()
      return
    }
  }
  const error: RPCError = {
    jsonrpc: req.body.jsonrpc,
    id: req.body.id ? req.body.id : null,
    error: {
      code: -32700,
      message: 'Parse error',
    },
  }

  revertWithError(res, 405, error)
}

export function revertWithError(
  res: Response,
  statusCode: number,
  error: RPCError,
) {
  res.status(statusCode).send(error)
}
