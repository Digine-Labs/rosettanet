/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEVMDecodeError, isRPCError, isStarknetContract } from '../../types/typeGuards'
import {
  EthereumSlot,
  EVMDecodeError,
  EVMDecodeResult,
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetContract,
  StarknetContractReadError,
  StarknetFunction,
} from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import {
  convertEthereumCalldataToParameters,
  convertUint256s,
  decodeEVMCalldata,
  getCalldataByteSize,
  getFunctionSelectorFromCalldata,
} from '../../utils/calldata'
import { ConvertableType, initializeStarknetAbi } from '../../utils/converters/abiFormatter'
import { Uint256ToU256 } from '../../utils/converters/integer'
import { formatStarknetResponse } from '../../utils/formatters'
import { findStarknetCallableMethod, matchStarknetFunctionWithEthereumSelector, StarknetCallableMethod } from '../../utils/match'
import { snKeccak } from '../../utils/sn_keccak'
import {
  CairoNamedConvertableType,
  generateEthereumFunctionSignature,
  getContractAbiAndMethods,
  getContractsMethods,
  getEthereumInputsCairoNamed,
  getEthereumOutputsCairoNamed,
} from '../../utils/starknet'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'

export interface EthCallParameters {
  from?: string
  to: string
  gas?: string| number| bigint
  gasPrice?: string| number| bigint
  value?: string| number| bigint
  data?: string
}

interface CallParameterObject {
  from?: string
  to: string
  gas?: string
  gasPrice?: string
  value?: string
  data?: string
}

export function isEthCallParameters(value: unknown): value is EthCallParameters {
  // We can improve these validations
  if (typeof value === "object" && value !== null) {
      const obj = value as EthCallParameters;
      return typeof obj.to === 'string'
  }
  return false;
}

export async function ethCallHandler(request: RPCRequest) : Promise<RPCResponse | RPCError> {
  if (Array.isArray(request.params) && request.params.length != 2) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter length should be 2.',
      },
    }
  }

  const parameters = request.params[0]; // What happens if they pass object or array?? TODO
  if(!isEthCallParameters(parameters)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, First parameter must be object',
      },
    }
  }

  if (!validateEthAddress(parameters.to)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, "to" field is not valid Ethereum address',
      },
    }
  }

  if (parameters.from && validateEthAddress(parameters.from)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, "from" field is not valid Ethereum address',
      },
    }
  }
  const targetFunctionSelector: string | null = getFunctionSelectorFromCalldata(parameters.data);

  if(targetFunctionSelector == null || typeof parameters.data === 'undefined') {
    return {
      jsonrpc: '2.0',
      id: request.id,
      result: '0x',
    }
  }

  const targetContractAddress: string | RPCError = await getSnAddressFromEthAddress(parameters.to);
  if(isRPCError(targetContractAddress)) {
    return targetContractAddress
  }

  const targetContract: StarknetContract | StarknetContractReadError = await getContractAbiAndMethods(targetContractAddress);
  if(!isStarknetContract(targetContract)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: targetContract.code,
        message: 'Error at reading starknet contract abi: ' + targetContract.message,
      }
    }
  }

  const contractTypeMapping: Map<string, ConvertableType> =
  initializeStarknetAbi(targetContract.abi)

  const starknetFunction: StarknetCallableMethod | undefined = findStarknetCallableMethod(targetFunctionSelector, targetContract.methods, contractTypeMapping);
  if(typeof starknetFunction === 'undefined') {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32708,
        message: 'Target function is not found in starknet contract.',
      }
    }
  }

  const starknetFunctionEthereumInputTypes: Array<CairoNamedConvertableType> =
  getEthereumInputsCairoNamed(starknetFunction.snFunction, contractTypeMapping)

  const calldata = parameters.data.slice(10)
  const EVMCalldataDecode: EVMDecodeResult | EVMDecodeError = decodeEVMCalldata(
    starknetFunctionEthereumInputTypes,
    calldata,
    targetFunctionSelector
  );

  if(isEVMDecodeError(EVMCalldataDecode)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: EVMCalldataDecode.code,
        message: EVMCalldataDecode.message,
      },
    }
  }

  const starknetSelector = snKeccak(starknetFunction.name.split('(')[0])
  const starknetCallParams = [
    {
      calldata: EVMCalldataDecode.calldata,
      contract_address: targetContractAddress,
      entry_point_selector: starknetSelector,
    },
    'pending', // update to latest
  ]

  const snResponse: RPCResponse | RPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_call',
    params: starknetCallParams,
    id: request.id,
  })

  if(isRPCError(snResponse)) {
    return snResponse
  }

  console.log(snResponse)

  const starknetFunctionEthereumOutputTypes: Array<CairoNamedConvertableType> = getEthereumOutputsCairoNamed(starknetFunction.snFunction, contractTypeMapping);

  

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: 'todo',
  }
}

/*
export async function ethCallHandlerx(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // TODO response

  // 1) First check parameters

  if (Array.isArray(request.params) && request.params.length != 2) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 2.',
      },
    }
  }

  if (
    typeof request.params[1] !== 'string' &&
    typeof request.params[1] !== 'number'
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Second parameter must be string',
      },
    }
  }

  const blockId: string | number = request.params[1]

  if (
    typeof request.params[0] !== 'object' &&
    Array.isArray(request.params[0]) &&
    request.params[0] === null
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, First parameter must be object',
      },
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isCallParameters = (obj: any): obj is CallParameterObject => 'to' in obj

  if (!isCallParameters(request.params[0])) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, "to" field is mandatory',
      },
    }
  }

  const parameters: CallParameterObject = request.params[0]

  if (!validateEthAddress(parameters.to)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, "to" field is not valid Ethereum address',
      },
    }
  }

  if (parameters.from && validateEthAddress(parameters.from)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, "from" field is not valid Ethereum address',
      },
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

  const functionSelector: string | null =
    typeof parameters.data === 'string'
      ? getFunctionSelectorFromCalldata(parameters.data)
      : '0x0'

  if (functionSelector === '0x0') {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Function selector is "0x0"',
      },
    }
  }
  const starknetTarget: string = await getSnAddressFromEthAddress(parameters.to)

  if (starknetTarget === '0x0') {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Ethereum address is not in Lens Contract.',
      },
    }
  }

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
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Target Starknet Function is not found.',
      },
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

  const snResponse: RPCResponse | string = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_call',
    params: starknetCallParams,
    id: request.id,
  })

  if (
    typeof snResponse == 'string' ||
    snResponse == null ||
    snResponse == undefined
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: snResponse,
      },
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
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Target Starknet Function is not found.',
      },
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
*/