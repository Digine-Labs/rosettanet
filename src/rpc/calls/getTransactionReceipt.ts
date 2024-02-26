import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function getTransactionReceiptHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // TODO: dynamic network from env?

  if (request.params.length == 0) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params should not be empty',
    }
  }

  const transactionHash = request.params[0] as string

  const response: RPCResponse | string = await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_getTransactionReceipt',
    params: [transactionHash],
    id: request.id,
  })

  if (typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }

  // TODO: expect that `callStarknet` might return an RPC error response
  if ((response as unknown as { error: unknown }).error) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Starknet RPC error',
    }
  }

  // TODO: use a schema validation library such as zod or manually(?) check the properties of the result object
  const result = response.result as {
    type: 'INVOKE' | 'L1_HANDLER' | 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT'
    transaction_hash: string
    actual_fee: {
      amount: string
      unit: 'WEI'
    }
    messages_sent: unknown
    events: {
      from_address: string
      keys: string[]
      data: string[]
    }[]
    execution_resources: unknown
    execution_result: unknown
    contract_address?: string // only on DEPLOY and DEPLOY_ACCOUNT transactions
    finality_status?: 'ACCEPTED_ON_L1' | 'ACCEPTED_ON_L2' // only on non-pending transactions
    block_hash?: string // only on non-pending transactions
    block_number?: number // only on non-pending transactions
    message_hash?: string // only on L1_HANDLER transactions
  }

  // might return an error for pending transactions because `eth_getTransactionReceipt` method doesn't work with pending transactions
  return {
    jsonrpc: '2.0',
    id: 1,
    result: {
      transactionHash: result.transaction_hash,
      // TODO: find what to use when block hash doesn't exist for pending transactions
      blockHash: result.block_hash ?? '0xtodo',
      // TODO: find what to use when block number doesn't exist for pending transactions
      blockNumber: '0x' + (result.block_number ?? 0).toString(16),
      // TODO: transform `events` to `logs`
      logs: result.events.map(event => ({
        transactionHash: result.transaction_hash,
        // TODO: not sure if `from_address` is `address` equivalent
        address: event.from_address,
        // TODO: find what to use when block hash doesn't exist for pending transactions
        blockHash: result.block_hash ?? '0xtodo',
        // TODO: find what to use when block number doesn't exist for pending transactions
        blockNumber: '0x' + (result.block_number ?? 0).toString(16),
        // TODO: find what to use for data, StarkNet events have multiple datas instead of a single one
        data: '0xtodo',
        // TODO: find what to use for log index
        logIndex: '0xtodo',
        removed: false,
        // TODO: find what to use for topics
        topics: [],
        // TODO: find a way to get transaction index or hardcode a value
        transactionIndex: '0xtodo',
      })),
      contractAddress: result.contract_address ?? null,
      // TODO: find what to use as effective gas price or hardcode a value
      effectiveGasPrice: '0xtodo',
      cumulativeGasUsed: result.actual_fee.amount,
      // TODO: find a way to get sender address, use null or hardcode a value
      from: '0xtodo',
      gasUsed: result.actual_fee.amount,
      logsBloom: '0x0',
      status: '0x1',
      // TODO: find a way to get contract address, use null or hardcode a value
      to: '0xtodo',
      // TODO: find a way to get transaction index or hardcode a value
      transactionIndex: '0xtodo',
      // TODO: find which one to hardcode 0x0, 0x1 or 0x2
      type: '0xtodo',
    },
  }
}
