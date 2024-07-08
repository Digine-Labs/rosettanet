/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  EthereumSlot,
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetFunction,
} from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import {
  convertEthereumCalldataToParameters,
  convertUint256s,
  getCalldataByteSize,
  getFunctionSelectorFromCalldata,
} from '../../utils/calldata'
import { Uint256ToU256 } from '../../utils/converters/integer'
import { formatStarknetResponse } from '../../utils/formatters'
import { matchStarknetFunctionWithEthereumSelector } from '../../utils/match'
import { snKeccak } from '../../utils/sn_keccak'
import {
  generateEthereumFunctionSignature,
  getContractsMethods,
} from '../../utils/starknet'
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
  /* if (typeof blockId === 'string') {
    if (blockId !== 'latest' && blockId !== 'pending') {
      // TODO: Support earliest
      return {
        code: 7979,
        message: 'Starknet RPC error',
        data: 'only pending and latest block id supported',
      }
    }
  } */

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

  if (functionSelector === '0x0') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'function call zero.',
    }
  }
  const starknetTarget: string = await getSnAddressFromEthAddress(parameters.to)

  const starknetCallableMethods: Array<StarknetFunction> =
    await getContractsMethods(starknetTarget)

  const starknetFunctionsEthereumFormat = starknetCallableMethods.map(fn =>
    generateEthereumFunctionSignature(fn.name, fn.inputs),
  )

  const targetStarknetFunction = matchStarknetFunctionWithEthereumSelector(
    starknetFunctionsEthereumFormat,
    functionSelector,
  )

  if (typeof targetStarknetFunction === 'undefined') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'target function not found',
    }
  }

  // const starknetFunction: StarknetFunction = starknetCallableMethods.filter(fn => fn.name === targetStarknetFunction.split('(')[0])

  // 3) Convert eth calldata into starknet calldata

  const calldataSlotsize: Array<EthereumSlot> = getCalldataByteSize(
    targetStarknetFunction,
  )
  const splittedData: Array<string> = await convertEthereumCalldataToParameters(
    targetStarknetFunction,
    calldataSlotsize,
    parameters.data,
  )

  const split256Bits: Array<string> = convertUint256s(splittedData).map(
    i => `0x${i}`,
  )

  // 4) Prepare starknet call params and Call starknet

  const starknetSelector = snKeccak(targetStarknetFunction.split('(')[0])

  const starknetCallParams = [
    {
      calldata: split256Bits,
      contract_address: starknetTarget,
      entry_point_selector: starknetSelector,
    },
    'pending', // update to latest
  ]

  const snResponse: RPCResponse | string = await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_call',
    params: starknetCallParams,
    id: request.id,
  })

  if (typeof snResponse === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: snResponse,
    }
  }

  // 5) Format response to eth

  const targetStarknetFunctionAsStarknetFunction: StarknetFunction | undefined =
    starknetCallableMethods.find(
      x => x.name === targetStarknetFunction.split('(')[0],
    )
  // TODO: Maybe we can find better way to get function outputs.

  if (typeof targetStarknetFunctionAsStarknetFunction === 'undefined') {
    // no way to here executed
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'target function not found',
    }
  }

  const formattedResponse = await formatStarknetResponse(
    targetStarknetFunctionAsStarknetFunction,
    snResponse.result,
  )

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: formattedResponse,
  }
}
