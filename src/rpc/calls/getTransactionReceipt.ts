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

  // TODO: use a schema validation library such as zod or manually(?) check the properties of the result object
  const result = response.result as {
    type: 'INVOKE' | 'L1_HANDLER' | 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT'
    transaction_hash: string
    actual_fee: string
    messages_sent: unknown
    events: unknown
    execution_resources: unknown
    execution_result: unknown
    contract_address?: string // only on DEPLOY and DEPLOY_ACCOUNT transactions
    finality_status?: 'ACCEPTED_ON_L1' | 'ACCEPTED_ON_L2' // only on non-pending transactions
    block_hash?: string // only on non-pending transactions
    block_number?: number // only on non-pending transactions
    message_hash?: string // only on L1_HANDLER transactions
  }

  return {
    jsonrpc: '2.0',
    id: 1,
    result: {
      transactionHash: result.transaction_hash,
      blockHash: result.block_hash ?? '0x0',
      blockNumber: '0x' + (result.block_number ?? 0).toString(16),
      logs: [], // TODO: transform `events` to `logs`
      contractAddress: result.contract_address ?? null,
      effectiveGasPrice: '0x2d7003407', // TODO: implement this
      cumulativeGasUsed: result.actual_fee,
      from: '0x5067c042e35881843f2b31dfc2db1f4f272ef48c', // TODO: implement this
      gasUsed: result.actual_fee,
      logsBloom: '0x0', // hardcoded
      status: '0x0', // TODO: implement this
      to: '0x3ee18b2214aff97000d974cf647e7c347e8fa585', // TODO: implement this
      transactionIndex: '0x4e', // TODO: implement this
      type: '0x0', // TODO: implement this
    },
  }
}
