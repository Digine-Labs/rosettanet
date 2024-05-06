import { Router, Response } from 'express'
import { ParsedRequest, ResponseHandler, RPCError } from '../types/types'
import { revertWithError } from '../utils/parser'
import { chainIdHandler } from './calls/chainId'
import { maxPriorityFeePerGasHandler } from './calls/maxPriorityFeePerGas'
import { gasPriceHandler } from './calls/gasPrice'
import { blockNumberHandler } from './calls/blockNumber'
import { getStorageAtHandler } from './calls/getStorageAt'
import { getBalanceHandler } from './calls/getBalance'
import { getBlockByHashHandler } from './calls/getBlockByHash'
import { callHandler } from './calls/call'
import { getTransactionsByBlockHashAndIndexHandler } from './calls/getTransactionByBlockHashAndIndex'
import { getTransactionsByBlockNumberAndIndexHandler } from './calls/getTransactionByBlockNumberAndIndex'
import { getBlockTransactionCountByHashHandler } from './calls/getBlockTransactionCountByHash'
import { getCodeHandler } from './calls/getCode'
import { getBlockTransactionCountByNumberHandler } from './calls/getBlockTransactionCountByNumber'
import { getTransactionReceiptHandler } from './calls/getTransactionReceipt'
import { feeHistoryHandler } from './calls/feeHistory'
import { getBlockByNumberHandler } from './calls/getBlockByNumber'
import { getTransactionsByHashHandler } from './calls/getTransactionByHash'
import { starknetCallHandler } from './calls/starknetCall'
import { ethCallHandler } from './calls/ethCall'

const router: Router = Router()

const Methods = new Map<string, ResponseHandler>([])
Methods.set('eth_chainId', {
  method: 'eth_chainId',
  handler: chainIdHandler,
})

Methods.set('eth_maxPriorityFeePerGas', {
  method: 'eth_maxPriorityFeePerGas',
  handler: maxPriorityFeePerGasHandler,
})

Methods.set('eth_gasPrice', {
  method: 'eth_gasPrice',
  handler: gasPriceHandler,
})

Methods.set('eth_blockNumber', {
  method: 'eth_blockNumber',
  handler: blockNumberHandler,
})

Methods.set('eth_getStorageAt', {
  method: 'eth_getStorageAt',
  handler: getStorageAtHandler,
})

Methods.set('eth_call', {
  method: 'eth_call',
  handler: callHandler,
})

Methods.set('eth_getBalance', {
  method: 'eth_getBalance',
  handler: getBalanceHandler,
})

Methods.set('eth_getBlockByHash', {
  method: 'eth_getBlockByHash',
  handler: getBlockByHashHandler,
})

Methods.set('eth_getBlockTransactionCountByHash', {
  method: 'eth_getBlockTransactionCountByHash',
  handler: getBlockTransactionCountByHashHandler,
})

Methods.set('eth_getTransactionByBlockHashAndIndex', {
  method: 'eth_getTransactionByBlockHashAndIndex',
  handler: getTransactionsByBlockHashAndIndexHandler,
})

Methods.set('eth_getTransactionByBlockNumberAndIndex', {
  method: 'eth_getTransactionByBlockNumberAndIndex',
  handler: getTransactionsByBlockNumberAndIndexHandler,
})

Methods.set('eth_getCode', {
  method: 'eth_getCode',
  handler: getCodeHandler,
})

Methods.set('eth_getBlockTransactionCountByNumber', {
  method: 'eth_getBlockTransactionCountByNumber',
  handler: getBlockTransactionCountByNumberHandler,
})

Methods.set('eth_getTransactionReceipt', {
  method: 'eth_getTransactionReceipt',
  handler: getTransactionReceiptHandler,
})

Methods.set('eth_feeHistory', {
  method: 'eth_feeHistory',
  handler: feeHistoryHandler,
})

Methods.set('eth_getBlockByNumber', {
  method: 'eth_getBlockByNumber',
  handler: getBlockByNumberHandler,
})

Methods.set('eth_getTransactionByHash', {
  method: 'eth_getTransactionByHash',
  handler: getTransactionsByHashHandler,
})

Methods.set('eth_call', {
  method: 'eth_call',
  handler: ethCallHandler
})

router.post('/', async function (req: ParsedRequest, res: Response) {
  const request = req.rpcRequest
  if (request?.method) {
    const methodFirstLetters: string = request.method.substring(0, 7)
    if (methodFirstLetters === 'starknet') {
      const result = await starknetCallHandler(request)
      res.send(result)
      return
    }
  }
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
