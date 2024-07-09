import { RPCErrorNew, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockHash } from '../../utils/validations'

export async function getTransactionsByHashHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCErrorNew> {
  const network = 'testnet'
  const method = 'starknet_getTransactionByHash'

  if (request.params.length != 1) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 1.',
      },
    }
  }

  // Extract the txHash from the request parameters.
  const txHash = request.params[0] as string

  // Validate the tx hash
  if (!validateBlockHash(txHash)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid transaction hash.',
      },
    }
  }

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method: method,
    params: [txHash],
    id: request.id,
  })

  if (
    typeof response == 'string' ||
    response == null ||
    response == undefined
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
    type: 'INVOKE' | 'L1_HANDLER' | 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT'
    transaction_hash: string
    max_fee: string
    version: string
    signature: string[]
    nonce: string
    contract_address: string
    entry_point_selector: string
    calldata: string[]
  }

  // Get the transaction recipt of this transaction
  const transactionReceipt: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method: 'starknet_getTransactionReceipt',
    params: [txHash],
    id: request.id,
  })

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
  const signature = result.signature // Assuming this is an array of FELT values
  const v = '0x1b' // Placeholder, as StarkNet does not have a direct 'v' equivalent, or use `0x1c` (27 or 28)
  const r = signature.length > 0 ? signature[0] : '0x0' // Map the first signature element to 'r'
  const s = signature.length > 1 ? signature[1] : '0x0' // Map the second signature element to 's'

  // Construct the Ethereum-like response, mapping StarkNet transaction details.
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: {
      hash: txHash,
      blockHash: '0x' + receiptRes.block_hash,
      blockNumber: receiptRes.block_number,
      from: result.contract_address,
      gas: receiptRes.actual_fee.amount,
      gasPrice: '0xEE6B280',
      input: '0x' + result.calldata.join(''), // Concatenate calldata for simplicity.
      nonce: '0x0',
      r,
      s,
      to: '0x0', // StarkNet transactions may not always have a direct 'to' field.
      transactionIndex: '0x0',
      v,
      value: '0x0', // StarkNet transactions don't directly map to ETH value transfers.
    },
  }
}
