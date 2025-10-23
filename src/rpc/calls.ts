/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Router, Response, Request } from 'express'
import { ResponseHandler, RPCError, RPCResponse } from '../types/types'
import { chainIdHandler } from './calls/chainId'
import { maxPriorityFeePerGasHandler } from './calls/maxPriorityFeePerGas'
import { gasPriceHandler } from './calls/gasPrice'
import { blockNumberHandler } from './calls/blockNumber'
import { getStorageAtHandler } from './calls/getStorageAt'
import { getBalanceHandler } from './calls/getBalance'
import { getBlockByHashHandler } from './calls/getBlockByHash'
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
import { ethSyncingHandler } from './calls/syncing'
import { getTransactionCountHandler } from './calls/getTransactionCount'
import { estimateGasHandler } from './calls/estimateGas'
import { accountsHandler } from './calls/accounts'
import { netVersionHandler } from './calls/netVersion'
import { blobBaseFeeHandler } from './calls/blobBaseFee'
import { isSnifferActive, writeLog, snifferOutput } from '../logger'
import { protocolVersionHandler } from './calls/protocolVersion'
import { getWorkHandler } from './calls/getWork'
import { miningHandler } from './calls/mining'
import { hashrateHandler } from './calls/hashrate'
import { netListeningHandler } from './calls/netListening'
import { web3clientVersionHandler } from './calls/web3clientVersion'
import { netPeerCountHandler } from './calls/netPeerCount'
import { getUncleByBlockHashAndIndexHandler } from './calls/getUncleByBlockHashAndIndex'
import { getUncleByBlockNumberAndIndexHandler } from './calls/getUncleByBlockNumberAndIndex'
import { getUncleCountByBlockNumberHandler } from './calls/getUncleCountByBlockNumber'
import { getUncleCountByBlockHashHandler } from './calls/getUncleCountByBlockHash'
import { unsubscribeHandler } from './calls/unsubscribe'
import { getFilterChangesHandler } from './calls/getFilterChanges'
import { sendRawTransactionHandler } from './calls/sendRawTransaction'
import { createAccessListHandler } from './calls/createAccessList'
import { isRPCError } from '../types/typeGuards'

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
  handler: ethCallHandler,
})

Methods.set('eth_syncing', {
  method: 'eth_syncing',
  handler: ethSyncingHandler,
})

Methods.set('eth_getTransactionCount', {
  method: 'eth_getTransactionCount',
  handler: getTransactionCountHandler,
})

Methods.set('eth_estimateGas', {
  method: 'eth_estimateGas',
  handler: estimateGasHandler,
})

Methods.set('eth_accounts', {
  method: 'eth_accounts',
  handler: accountsHandler,
})

Methods.set('net_version', {
  method: 'net_version',
  handler: netVersionHandler,
})

Methods.set('eth_protocolVersion', {
  method: 'eth_protocolVersion',
  handler: protocolVersionHandler,
})

Methods.set('eth_getWork', {
  method: 'eth_getWork',
  handler: getWorkHandler,
})

Methods.set('eth_mining', {
  method: 'eth_mining',
  handler: miningHandler,
})

Methods.set('eth_hashrate', {
  method: 'eth_hashrate',
  handler: hashrateHandler,
})

Methods.set('eth_blobBaseFee', {
  method: 'eth_blobBaseFee',
  handler: blobBaseFeeHandler,
})

Methods.set('net_listening', {
  method: 'net_listening',
  handler: netListeningHandler,
})

Methods.set('web3_clientVersion', {
  method: 'web3_clientVersion',
  handler: web3clientVersionHandler,
})

Methods.set('net_peerCount', {
  method: 'net_peerCount',
  handler: netPeerCountHandler,
})

Methods.set('eth_getUncleByBlockHashAndIndex', {
  method: 'eth_getUncleByBlockHashAndIndex',
  handler: getUncleByBlockHashAndIndexHandler,
})

Methods.set('eth_getUncleByBlockNumberAndIndex', {
  method: 'eth_getUncleByBlockNumberAndIndex',
  handler: getUncleByBlockNumberAndIndexHandler,
})

Methods.set('eth_getUncleCountByBlockNumber', {
  method: 'eth_getUncleCountByBlockNumber',
  handler: getUncleCountByBlockNumberHandler,
})

Methods.set('eth_getUncleCountByBlockHash', {
  method: 'eth_getUncleCountByBlockHash',
  handler: getUncleCountByBlockHashHandler,
})

Methods.set('eth_unsubscribe', {
  method: 'eth_unsubscribe',
  handler: unsubscribeHandler,
})

Methods.set('eth_getFilterChanges', {
  method: 'eth_getFilterChanges',
  handler: getFilterChangesHandler,
})

Methods.set('eth_sendRawTransaction', {
  method: 'eth_sendRawTransaction',
  handler: sendRawTransactionHandler,
})

Methods.set('eth_createAccessList', {
  method: 'eth_createAccessList',
  handler: createAccessListHandler,
})

async function handleRequest(request: any): Promise<RPCResponse | RPCError> {
  try {
    if (request && typeof request === 'object') {
      if ('method' in request && typeof request.method === 'string') {
        const id = request.id ?? null
        const params = request.params || []

        const method = request.method
        const parsedRequest = {
          jsonrpc: '2.0',
          id,
          method,
          params,
        }
        // if starknet call early exit.
        if (method.length > 8 && method.substring(0, 8) === 'starknet') {
          return await starknetCallHandler(parsedRequest)
        }

        if (Methods.has(method)) {
          const handler = Methods.get(method)
          if (handler) {
            try {
              const result: RPCResponse | RPCError =
                await handler.handler(parsedRequest)
              if (isSnifferActive()) {
                const logMsg = snifferOutput(request, result)
                if (isRPCError(result)) {
                  writeLog(2, logMsg)
                } else {
                  writeLog(0, logMsg)
                }
              }
              return result
            } catch (ex) {
              const errorMessage = ex instanceof Error ? ex.message : String(ex);
              writeLog(2, JSON.stringify({ request, error: errorMessage }))
              return <RPCError>{
                jsonrpc: '2.0',
                id: id,
                error: {
                  code: -32500,
                  message: 'Internal server error',
                },
              }
            }
          } else {
            return <RPCError>{
              jsonrpc: '2.0',
              id: id,
              error: {
                code: -32601,
                message: 'Method not found',
              },
            }
          }
        } else {
          return <RPCError>{
            jsonrpc: '2.0',
            id: id,
            error: {
              code: -32601,
              message: 'Method not found',
            },
          }
        }
      } else {
        return <RPCError>{
          jsonrpc: '2.0',
          id: request.id ?? null,
          error: {
            code: -32603,
            message: 'method not presented',
          },
        }
      }
    } else {
      return <RPCError>{
        jsonrpc: '2.0',
        id: request.id ?? null,
        error: {
          code: -32700,
          message: 'parse error',
        },
      }
    }
  } catch (ex) {
    const errorMessage = `Error at method ${request.method}`
    writeLog(
      2,
      JSON.stringify({
        title: errorMessage,
        message:
          typeof (ex as Error).message === 'string'
            ? (ex as Error).message
            : ex,
        request: request,
      }),
    )
    return <RPCError>{
      jsonrpc: '2.0',
      id: request.id ?? null,
      error: {
        code: -32700,
        message: 'parse error',
      },
    }
  }
}

router.post('/', async function (req: Request, res: Response) {
  // Handle batch requests
  if (Array.isArray(req.body)) {
    // Check for empty batch
    // Return null in case empty array
    if (req.body.length === 0) {
      return res.status(200).send([])
    }

    const results: Array<RPCResponse | RPCError> = await Promise.all(
      req.body.map(async request => {
        return await handleRequest(request)
      }),
    )

    const filteredResults = results.filter(result => result !== null)
    res.send(filteredResults.length > 0 ? filteredResults : [])
    return
  }

  const result: RPCResponse | RPCError = await handleRequest(req.body)
  res.send(result)
  return
})

export default router
