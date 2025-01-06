import { isStarknetRPCError } from '../../types/typeGuards'
import { RPCError, RPCRequest, RPCResponse, StarknetRPCError } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { getEthAddressFromSnAddress } from '../../utils/wrapper'

export async function getTransactionReceiptHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // TODO: dynamic network from env?

  if (request.params.length == 0) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter should be valid transaction hash.',
      },
    }
  }

  const transactionHash = request.params[0].transactionHash
  // TODO: validate transaction hash

  const response1: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_getTransactionReceipt',
    params: {
      transaction_hash : transactionHash
    },
    id: request.id,
  })

  if(isStarknetRPCError(response1)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: response1
    }
  }

  // TODO: use a schema validation library such as zod or manually(?) check the properties of the result object
  const result1 = response1.result

  console.log(response1)

  // We return an error for pending transactions as this is the default behaviour in EVM chains.
  // Non-pending transactions always have `block_hash` and `block_number` properties.

  const response2: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_getBlockWithTxs',
    params: [{ block_number: result1.block_number! }],
    id: request.id,
  })

  if(isStarknetRPCError(response2)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: response2
    }
  }

  const result2 = response2.result as {
    transactions: (Transaction & { sender_address?: string })[]
  }

  const transactionIndex = result2.transactions.findIndex(
    tx => tx.transaction_hash === result1.transaction_hash,
  )

  const senderAddress =
    result2.transactions[transactionIndex].sender_address ??
    '0x000000000000000000000000000000000000000000000000000000000000000'

  const contractAddress: string | StarknetRPCError = await getEthAddressFromSnAddress(result1.contract_address)

  if(isStarknetRPCError(contractAddress)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: contractAddress
    }
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: {
      transactionHash: transactionHash,
      blockHash: result1.block_hash,
      blockNumber: '0x' + result1.block_number.toString(16),
      logs: [], // Todo events
      contractAddress: contractAddress,
      effectiveGasPrice: '0x1',
      cumulativeGasUsed: result1.actual_fee.amount,
      from: senderAddress,
      gasUsed: result1.actual_fee.amount,
      logsBloom: '0x0',
      status: '0x1', // 0 if failed
      // NOTE: hardcoded value
      to: contractAddress
        ? null
        : '0x000000000000000000000000000000000000000000000000000000000000000',
      transactionIndex: '0x' + transactionIndex.toString(16),
      // NOTE: I noticed that basic transfers, contract creations and interactions are all transaction type 2 after EIP-1559.
      type: '0x2',
    },
  }
}

type Transaction = {
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
