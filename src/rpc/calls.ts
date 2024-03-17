import { Router, Response } from 'express'
import { ParsedRequest, ResponseHandler, RPCError } from '../types/types'
import { revertWithError } from '../utils/parser'
import { chainIdHandler, chainIdHandlerSnResponse } from './calls/chainId'
import {
  maxPriorityFeePerGasHandler,
  maxPriorityFeePerGasHandlerSnResponse,
} from './calls/maxPriorityFeePerGas'
import { gasPriceHandler, gasPriceHandlerSnResponse } from './calls/gasPrice'
import {
  blockNumberHandler,
  blockNumberHandlerSnResponse,
} from './calls/blockNumber'
import {
  getStorageAtHandler,
  getStorageAtHandlerSnResponse,
} from './calls/getStorageAt'
import {
  getBalanceHandler,
  getBalanceHandlerSnResponse,
} from './calls/getBalance'
import { callHandler, callHandlerSnResponse } from './calls/call'
import {
  getBlockTransactionCountByHashHandler,
  getBlockTransactionCountByHashSnResponse,
} from './calls/getBlockTransactionCountByHash'
import { getTransactionsByBlockHashAndIndexHandler } from './calls/getTransactionByBlockHashAndIndex'

const router: Router = Router()

const Methods = new Map<string, ResponseHandler>([])
Methods.set('eth_chainId', {
  method: 'eth_chainId',
  handler: chainIdHandler,
})

Methods.set('starknet_chainId', {
  method: 'starknet_chainId',
  handler: chainIdHandlerSnResponse,
})

Methods.set('eth_maxPriorityFeePerGas', {
  method: 'eth_maxPriorityFeePerGas',
  handler: maxPriorityFeePerGasHandler,
})

Methods.set('starknet_maxPriorityFeePerGas', {
  method: 'starknet_maxPriorityFeePerGas',
  handler: maxPriorityFeePerGasHandlerSnResponse,
})

Methods.set('eth_gasPrice', {
  method: 'eth_gasPrice',
  handler: gasPriceHandler,
})

Methods.set('starknet_gasPrice', {
  method: 'starknet_gasPrice',
  handler: gasPriceHandlerSnResponse,
})

Methods.set('eth_blockNumber', {
  method: 'eth_blockNumber',
  handler: blockNumberHandler,
})

Methods.set('starknet_blockNumber', {
  method: 'starknet_blockNumber',
  handler: blockNumberHandlerSnResponse,
})

Methods.set('eth_getStorageAt', {
  method: 'eth_getStorageAt',
  handler: getStorageAtHandler,
})

Methods.set('starknet_getStorageAt', {
  method: 'starknet_getStorageAt',
  handler: getStorageAtHandlerSnResponse,
})

Methods.set('eth_call', {
  method: 'eth_call',
  handler: callHandler,
})

Methods.set('starknet_call', {
  method: 'starknet_call',
  handler: callHandlerSnResponse,
})

Methods.set('eth_getBalance', {
  method: 'eth_getBalance',
  handler: getBalanceHandler,
})

Methods.set('starknet_getBalance', {
  method: 'starknet_getBalance',
  handler: getBalanceHandlerSnResponse,
})

Methods.set('eth_getBlockTransactionCountByHash', {
  method: 'eth_getBlockTransactionCountByHash',
  handler: getBlockTransactionCountByHashHandler,
})

Methods.set('starknet_getBlockTransactionCountByHash', {
  method: 'starknet_getBlockTransactionCountByHash',
  handler: getBlockTransactionCountByHashSnResponse,
})

Methods.set('eth_getTransactionByBlockHashAndIndex', {
  method: 'eth_getTransactionByBlockHashAndIndex',
  handler: getTransactionsByBlockHashAndIndexHandler,
})

Methods.set('starknet_getTransactionByBlockHashAndIndex', {
  method: 'starknet_getTransactionByBlockHashAndIndex',
  handler: getTransactionsByBlockHashAndIndexHandler,
})

router.post('/', async function (req: ParsedRequest, res: Response) {
  const request = req.rpcRequest
  if (request?.method && request?.params && Methods.has(request.method)) {
    const handler: ResponseHandler | undefined = Methods.get(request.method)
    if (handler) {
      const result = await handler.handler(request)

      res.send(result)
      return
    }
  } else {
    const error: RPCError = {
      code: 7979,
      message: 'Method not implemented',
      data: '405 Not Allowed',
    }
    revertWithError(res, 405, error)
    return
  }
})

export default router
