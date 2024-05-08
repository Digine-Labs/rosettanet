/* eslint-disable @typescript-eslint/no-unused-vars */
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { getFunctionSelectorFromCalldata } from '../../utils/converters/calldata'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'

interface CallParameterObject {
  from?: string
  to: string
  gas?: string
  gasPrice?: string
  value?: string
  data?: string
}

export async function ethCallHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // TODO response

  // 1) First check parameters

  if (Array.isArray(request.params) && request.params.length != 2) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params length must be 2',
    }
  }

  if (
    typeof request.params[1] !== 'string' &&
    typeof request.params[1] !== 'number'
  ) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'second param must be string',
    }
  }

  const blockId: string | number = request.params[1]
  // integer block number, or the string "latest", "earliest" or "pending" on eth
  // block_id  -  Expected one of block_number, block_hash, latest, pending. on starknet
  if (typeof blockId === 'string') {
    if (blockId !== 'latest' && blockId !== 'pending') {
      // TODO: Support earliest
      return {
        code: 7979,
        message: 'Starknet RPC error',
        data: 'only pending and latest block id supported',
      }
    }
  }

  if (
    typeof request.params[0] !== 'object' &&
    Array.isArray(request.params[0]) &&
    request.params[0] === null
  ) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'first parameter is not object',
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isCallParameters = (obj: any): obj is CallParameterObject => 'to' in obj

  if (!isCallParameters(request.params[0])) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'to field is mandatory',
    }
  }

  const parameters: CallParameterObject = request.params[0]

  if (!validateEthAddress(parameters.to)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'to field is not valid eth address',
    }
  }

  if (parameters.from && validateEthAddress(parameters.from)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'from field is not valid eth address',
    }
  }

  // TODO: improve validations

  // 2) Read function selector & match with starknet contract function
  //    1) First get eth function signature
  //    2) Convert to address to starknet address
  //    3) Read starknet address ABI and get all accessible function names
  //    4) Convert all accesible function parameter types into ethereum data types
  //    5) Calculate ethereum function signatures
  //    6) Try to match signatures to find which function to call on starknet

  const functionSelector: string =
    typeof parameters.data === 'string'
      ? getFunctionSelectorFromCalldata(parameters.data)
      : '0x0'
  const starknetTarget: string = await getSnAddressFromEthAddress(parameters.to)

  // 3) Convert eth calldata into starknet calldata
  return {
    jsonrpc: '2.0',
    id: 1,
    result: '0x0',
  }
}
