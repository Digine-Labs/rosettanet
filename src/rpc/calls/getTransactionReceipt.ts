import { RPCErrorNew, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { getEthAddressFromSnAddress } from '../../utils/wrapper'

export async function getTransactionReceiptHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCErrorNew> {
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

  const transactionHash = request.params[0] as string

  const response1: RPCResponse | string = await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_getTransactionReceipt',
    params: [transactionHash],
    id: request.id,
  })

  if (
    typeof response1 == 'string' ||
    response1 == null ||
    response1 == undefined
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: response1,
      },
    }
  }

  // TODO: use a schema validation library such as zod or manually(?) check the properties of the result object
  const result1 = response1.result as Transaction

  // We return an error for pending transactions as this is the default behaviour in EVM chains.
  // Non-pending transactions always have `block_hash` and `block_number` properties.
  const isPendingTransaction = !('finality_status' in result1)
  if (isPendingTransaction) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Only finished blocks supported. Pending blocks are not supported.',
      },
    }
  }

  const response2 = await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_getBlockWithTxs',
    params: [{ block_number: result1.block_number! }],
    id: request.id,
  })

  if (
    typeof response2 == 'string' ||
    response2 == null ||
    response2 == undefined
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: response2,
      },
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

  const contractAddress = result1.contract_address
    ? await getEthAddressFromSnAddress(result1.contract_address)
    : null

  return {
    jsonrpc: '2.0',
    id: 1,
    result: {
      transactionHash: transactionHash,
      blockHash: result1.block_hash!,
      blockNumber: '0x' + result1.block_number!.toString(16),
      logs: await Promise.all(
        result1.events.map(async (event, i) => ({
          transactionHash: transactionHash,
          address: await getEthAddressFromSnAddress(event.from_address),
          blockHash: result1.block_hash!,
          blockNumber: '0x' + result1.block_number!.toString(16),
          // NOTE: hardcoded value
          data: '0x0',
          logIndex: '0x' + i.toString(16),
          removed: false,
          // NOTE: hardcoded value
          topics: [],
          transactionIndex: '0x' + transactionIndex.toString(16),
        })),
      ),
      contractAddress: contractAddress,
      effectiveGasPrice: '0x1',
      cumulativeGasUsed: result1.actual_fee.amount,
      from: senderAddress,
      gasUsed: result1.actual_fee.amount,
      logsBloom: '0x0',
      status: '0x1',
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
