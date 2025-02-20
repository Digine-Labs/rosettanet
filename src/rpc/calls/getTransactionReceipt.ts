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
  constructor_calldata: string[]
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
        if(typeof obj.type === 'string' && obj.type === 'INVOKE') {
          return typeof obj.transaction_hash === 'string' && typeof obj.sender_address === 'string' 
          && typeof obj.version === 'string' && typeof obj.resource_bounds === 'object' && typeof obj.resource_bounds.l1_gas === 'object'
          && typeof obj.resource_bounds.l2_gas === 'object' && typeof obj.resource_bounds.l1_gas.max_amount === 'string' 
          && typeof obj.resource_bounds.l1_gas.max_price_per_unit === 'string' && typeof obj.resource_bounds.l2_gas.max_amount === 'string'
          && typeof obj.resource_bounds.l2_gas.max_price_per_unit === 'string' && Array.isArray(obj.calldata) && obj.calldata.length > 0;
        } else {
          return typeof obj.transaction_hash === 'string' && Array.isArray(obj.constructor_calldata) && obj.constructor_calldata.length > 0
        }

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

  // TODO: deploy tx returns failin because there is no sender_address on deploy account tx

  // TODO: Improve safety for if deploy account tx

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


  const { transaction_hash, sender_address, type, version, resource_bounds, calldata, constructor_calldata } = starknetTransactionDetails.result;
  const { block_hash, block_number, events, execution_status, finality_status, actual_fee} = starknetTransactionReceipt.result;
  if(type === 'DEPLOY_ACCOUNT') {
    const gasUsed = calculateSpentGas(resource_bounds.l1_gas.max_price_per_unit, actual_fee)
    const receiptObject = {
      blockHash: block_hash,
      blockNumber: new BigNumber(block_number).toString(16), // Hex string eg 0x123
      contractAddress: null,
      cumulativeGasUsed: '0x500FF', // Random value
      effectiveGasPrice: resource_bounds.l1_gas.max_price_per_unit,
      from: constructor_calldata[0], // Sender address but receive it from rosettanet
      gasUsed: gasUsed,
      logs: [], // These will be added after
      logsBloom :'',  // These will be added after
      status: execution_status === 'SUCCEEDED' ? '0x1' : '0x0',
      to: constructor_calldata[0],
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

  const to = calldata[0];


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