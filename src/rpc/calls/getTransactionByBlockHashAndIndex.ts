import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockHash } from '../../utils/validations'

export async function getTransactionsByBlockHashAndIndexHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const network = 'testnet'
  const method = 'starknet_getBlockWithTxs'

  if (request.params.length != 2) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 2.',
      },
    }
  }

  // Extract the blockHash and index from the request parameters.
  const blockHash = request.params[0] as string
  const index = parseInt(request.params[1] as string, 16) // Convert index from hex to integer.

  // Validate the block hash
  if (!validateBlockHash(blockHash)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid block hash.',
      },
    }
  }

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method,
    params: [{ block_hash: blockHash }],
    id: request.id,
  })

  if (
    typeof response == 'string' ||
    response == null ||
    typeof response == 'undefined'
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: response,
      },
    }
  }

  const result = response.result as {
    block_hash: string
    block_number: number
    l1_gas_price: {
      price_in_wei: string
    }
    new_root: string
    parent_hash: string
    sequencer_address: string
    starknet_version: string
    status: 'RECEIVED' | 'REJECTED' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1'
    timestamp: number
    transactions: Array<{
      calldata: string[]
      max_fee: string
      nonce: string
      sender_address: string
      signature: string[]
      transaction_hash: string
      type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
      version: string
    }>
  }

  if (
    result.status !== 'ACCEPTED_ON_L1' &&
    result.status !== 'ACCEPTED_ON_L2'
  ) {
    // Check if the block is accepted
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32002,
        message: 'Resource unavailable, Block is not accepted yet.',
      },
    }
  }

  // Attempt to retrieve the specified transaction by index.
  const transaction = result.transactions[index]

  if (!transaction) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Transaction index out of bounds.',
      },
    }
  }

  // Get the transaction recipt of this transaction
  const transactionReceipt: RPCResponse | string = await callStarknet(
    'testnet',
    {
      jsonrpc: request.jsonrpc,
      method: 'starknet_getTransactionReceipt',
      params: [transaction.transaction_hash],
      id: request.id,
    },
  )

  if (
    typeof transactionReceipt === 'string' ||
    transactionReceipt == null ||
    transactionReceipt == undefined
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: transactionReceipt,
      },
    }
  }

  const receiptRes = transactionReceipt.result as {
    type: 'INVOKE' | 'L1_HANDLER' | 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT'
    transaction_hash: string
    actual_fee: {
      amount: string
      unit: 'WEI'
    }
    block_hash: string
    block_number: number
    events: string[] // Consider defining a more specific type for the elements in this array if possible
    execution_resources: {
      memory_holes: number
      range_check_builtin_applications: number
      steps: number
    }
    execution_status: 'SUCCEEDED' | string // Adjust as necessary to include other potential status values
    finality_status: 'ACCEPTED_ON_L1' | string // Adjust as necessary to include other potential finality statuses
    messages_sent: string[] // Consider defining a more specific type for the elements in this array if possible
  }

  // Map StarkNet signature components to Ethereum's v, r, s
  const signature = transaction.signature // Assuming this is an array of FELT values
  const v = '0x1b' // Placeholder, as StarkNet does not have a direct 'v' equivalent, or use `0x1c` (27 or 28)
  const r = signature.length > 0 ? signature[0] : '0x0' // Map the first signature element to 'r'
  const s = signature.length > 1 ? signature[1] : '0x0' // Map the second signature element to 's'

  // Construct the Ethereum-like response, mapping StarkNet transaction details.
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: {
      blockHash: blockHash,
      blockNumber: '0x' + result.block_number.toString(16),
      from: transaction.sender_address,
      gas: receiptRes.actual_fee.amount,
      gasPrice: '0x' + result.l1_gas_price.price_in_wei,
      hash: transaction.transaction_hash,
      input: '0x' + transaction.calldata.join(''), // Concatenate calldata for simplicity.
      nonce: '0x' + parseInt(transaction.nonce).toString(16),
      to: '0x', // StarkNet transactions may not always have a direct 'to' field.
      transactionIndex: '0x' + index.toString(16),
      value: '0x0', // StarkNet transactions don't directly map to ETH value transfers.
      v,
      r,
      s,
    },
  }
}
