/* eslint-disable @typescript-eslint/no-unused-vars */
import BigNumber from 'bignumber.js'
import { isRPCResponse, isStarknetRPCError } from '../../types/typeGuards'
import { RPCError, RPCRequest, RPCResponse, StarknetRPCError } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { getEthAddressFromSnAddress } from '../../utils/wrapper'
import { calculateSpentGas } from '../../utils/gas'

interface TransactionByHashResponse {
  transaction_hash: string 
  sender_address: string
  type: string
  version: string
  resource_bounds: {
    l1_gas : {
      max_amount: string
      max_price_per_unit: string
    }
    l2_gas: {
      max_amount: string
      max_price_per_unit: string
    }
  }
  calldata: string[]
}

interface TransactionReceiptResponse {
  block_hash: string
  block_number: number | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any
  execution_status: string
  finality_status: string
  actual_fee: {
    amount: string
    unit: string
  }
}

function isTransactionByHashResponse(value: unknown): value is TransactionByHashResponse {
    if (typeof value === "object" && value !== null) {
        const obj = value as TransactionByHashResponse;
        return typeof obj.transaction_hash === 'string' && typeof obj.sender_address === 'string' && typeof obj.type === 'string' 
        && typeof obj.version === 'string' && typeof obj.resource_bounds === 'object' && typeof obj.resource_bounds.l1_gas === 'object'
        && typeof obj.resource_bounds.l2_gas === 'object' && typeof obj.resource_bounds.l1_gas.max_amount === 'string' 
        && typeof obj.resource_bounds.l1_gas.max_price_per_unit === 'string' && typeof obj.resource_bounds.l2_gas.max_amount === 'string'
        && typeof obj.resource_bounds.l2_gas.max_price_per_unit === 'string' && Array.isArray(obj.calldata) && obj.calldata.length > 0;
    }
    return false;
}

function isTransactionReceiptResponse(value: unknown): value is TransactionReceiptResponse {
  if (typeof value === "object" && value !== null) {
      const obj = value as TransactionReceiptResponse;
      return typeof obj.block_hash === 'string' && typeof obj.execution_status === 'string' && typeof obj.finality_status === 'string' 
      && typeof obj.events !== 'undefined' && typeof obj.actual_fee === 'object' && (typeof obj.block_number === 'number' || typeof obj.block_number === 'string')
      && typeof obj.actual_fee.amount === 'string' && typeof obj.actual_fee.unit === 'string';
  }
  return false;
}

type TransactionHashObject = {
  transaction_hash: string
}

interface TransactionReceiptRequest extends RPCRequest {
  params: string[] | TransactionHashObject[]
}

function isTransactionReceiptRequest(value: unknown): value is TransactionReceiptRequest {
  if(typeof value === 'object' && value !== null) {
    const obj = value as TransactionReceiptRequest;
    return Array.isArray(obj.params) && obj.params.length == 1 
    && (typeof obj.params[0] === 'string' || (typeof obj.params[0] === 'object' && 'transaction_hash' in obj.params[0]))
  }
  return false;
}


export async function getTransactionReceiptHandler(request: TransactionReceiptRequest): Promise<RPCResponse | RPCError> {
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

  const txHash = typeof request.params[0] === 'string'
  ? request.params[0]: request.params[0].transaction_hash;



  const starknetTransactionDetails: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_getTransactionByHash',
    params: {
      transaction_hash : txHash
    },
    id: request.id,
  })

  if(!isRPCResponse(starknetTransactionDetails)) {
    return <RPCResponse> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: null
    }
  }

  if(!isTransactionByHashResponse(starknetTransactionDetails.result)) {
    return <RPCResponse> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: null
    }
  }

  const starknetTransactionReceipt: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_getTransactionReceipt',
    params: {
      transaction_hash : txHash
    },
    id: request.id,
  })

  if(!isRPCResponse(starknetTransactionReceipt)) {
    return <RPCResponse> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: null
    }
  }

  if(!isTransactionReceiptResponse(starknetTransactionReceipt.result)) {
    return <RPCResponse> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: null
    } 
  }


  const { transaction_hash, sender_address, type, version, resource_bounds, calldata } = starknetTransactionDetails.result;
  const { block_hash, block_number, events, execution_status, finality_status, actual_fee} = starknetTransactionReceipt.result;

  const to = calldata[0];

  console.log(starknetTransactionDetails)
  console.log(starknetTransactionReceipt)

  const from: string | StarknetRPCError = await getEthAddressFromSnAddress(sender_address);

  if(isStarknetRPCError(from)) {
    return <RPCResponse> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: null
    }  
  }

  const gasUsed = calculateSpentGas(resource_bounds.l1_gas.max_price_per_unit, actual_fee)

  const receiptObject = {
    blockHash: block_hash,
    blockNumber: new BigNumber(block_number).toString(16), // Hex string eg 0x123
    contractAddress: null,
    cumulativeGasUsed: '0x500FF', // Random value
    effectiveGasPrice: resource_bounds.l1_gas.max_price_per_unit,
    from: from, // Sender address but receive it from rosettanet
    gasUsed: gasUsed,
    logs: [], // These will be added after
    logsBloom :'',  // These will be added after
    status: execution_status === 'SUCCEEDED' ? '0x1' : '0x0',
    to: to,
    transactionHash: transaction_hash,
    transactionIndex: '0x1', // We may need extra request to receive this. Is it really important?
    type: '0x2'
  }

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: receiptObject
  }
}
export async function getTransactionReceiptHandlerx(
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
