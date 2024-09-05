import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockHash } from '../../utils/validations'

interface RPCRequestWithObject {
  jsonrpc: '2.0'
  id: number
  method: string
  params: [{ block_hash: string }]
}

interface V1TransactionObject {
  calldata: string[]
  max_fee: string
  nonce: string
  sender_address: string
  signature: string[]
  transaction_hash: string
  type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
  version: string
}

interface V3TransactionObject {
  account_deployment_data: string[]
  calldata: string[]
  fee_data_availability_mode: string
  nonce: string
  nonce_data_availability_mode: string
  paymaster_data: string[]
  resource_bounds: {
    l1_gas: {
      max_amount: string
      max_price_per_unit: string
    }
    l2_gas: {
      max_amount: string
      max_price_per_unit: string
    }
  }
  sender_address: string
  signature: string[]
  tip: string
  transaction_hash: string
  type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
  version: string
}

export async function getBlockReceiptsHandler(
  request: RPCRequest | RPCRequestWithObject,
): Promise<RPCResponse | RPCError> {
  const method = 'starknet_getBlockWithTxs'

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

  if (
    typeof request.params[0] === 'object' &&
    'block_hash' in request.params[0]
  ) {
    const blockHash = request.params[0].block_hash as string

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

    const response: RPCResponse | string = await callStarknet({
      jsonrpc: request.jsonrpc,
      method,
      params: [{ block_hash: blockHash }],
      id: request.id,
    })

    if (
      typeof response === 'string' ||
      response === null ||
      typeof response === 'undefined'
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
        price_in_fri: string
      }
      new_root: string
      parent_hash: string
      sequencer_address: string
      starknet_version: string
      status: 'RECEIVED' | 'REJECTED' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1'
      timestamp: number
      transactions: Array<V1TransactionObject> | Array<V3TransactionObject>
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

    const transactions = result.transactions.map((transaction, i) => ({
      blockHash: result.block_hash,
      blockNumber: result.block_number,
      contractAddress: null,
      cumulativeGasUsed: '0x0',
      effectiveGasPrice: result.l1_gas_price.price_in_wei,
      from: transaction.sender_address,
      gasUsed: '0x0',
      logs: [],
      logsBloom: '0x0',
      status: '0x1',
      to: transaction.calldata[1],
      transactionHash: transaction.transaction_hash,
      transactionIndex: '0x' + i,
      type: '0x2',
    }))

    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: transactions,
    }
  } else {
    const response: RPCResponse | string = await callStarknet({
      jsonrpc: request.jsonrpc,
      method,
      params: request.params,
      id: request.id,
    })

    if (
      typeof response === 'string' ||
      response === null ||
      typeof response === 'undefined'
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
        price_in_fri: string
      }
      new_root: string
      parent_hash: string
      sequencer_address: string
      starknet_version: string
      status: 'RECEIVED' | 'REJECTED' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1'
      timestamp: number
      transactions: Array<V1TransactionObject> | Array<V3TransactionObject>
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

    const transactions = result.transactions.map((transaction, i) => ({
      blockHash: result.block_hash,
      blockNumber: result.block_number,
      contractAddress: null,
      cumulativeGasUsed: '0x0',
      effectiveGasPrice: result.l1_gas_price.price_in_wei,
      from: transaction.sender_address,
      gasUsed: '0x0',
      logs: [],
      logsBloom: '0x0',
      status: '0x1',
      to: transaction.calldata[1],
      transactionHash: transaction.transaction_hash,
      transactionIndex: '0x' + i,
      type: '0x2',
    }))

    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: transactions,
    }
  }
}
