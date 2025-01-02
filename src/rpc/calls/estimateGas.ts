import {
  RPCResponse,
  RPCRequest,
  RPCError,
  StarknetRPCError,
  StarknetContract,
  StarknetContractReadError,
  EVMDecodeResult,
  EVMDecodeError,
} from '../../types/types'
import { callStarknetEstimateFee, getStarknetAccountNonce } from '../../utils/callHelper'
import { validateEthAddress } from '../../utils/validations'
import {
  decodeEVMCalldata,
  getFunctionSelectorFromCalldata,
} from '../../utils/calldata'
import {
  CairoNamedConvertableType,
  getContractAbiAndMethods,
  getEthereumInputsCairoNamed,
} from '../../utils/starknet'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'
import { isEVMDecodeError, isStarknetContract, isStarknetRPCError } from '../../types/typeGuards'
import { prepareRosettanetCalldata } from '../../utils/transaction'
import BigNumber from 'bignumber.js'
import { ConvertableType, initializeStarknetAbi } from '../../utils/converters/abiFormatter'
import { findStarknetCallableMethod, StarknetCallableMethod } from '../../utils/match'
import { addHexPrefix } from '../../utils/padding'

interface EstimateGasParameters {
  from: string
  to: string
  gas?: string
  gasPrice?: string
  value?: string
  data?: string
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
}

export function isEstimateGasParameters(value: unknown): value is EstimateGasParameters {
  // We can improve these validations
  if (typeof value === "object" && value !== null) {
      const obj = value as EstimateGasParameters;
      return typeof obj.to === 'string' && typeof obj.from === 'string'
  }
  return false;
}

export async function estimateGasHandler(request: RPCRequest): Promise<RPCResponse | RPCError> {
  if(!Array.isArray(request.params)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32700,
        message: 'Estimate gas params must be array'
      }
    }
  }

  if(request.params.length != 1) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32700,
        message: 'Params length must be 1'
      }
    }
  }
  
  const parameters = request.params[0];
  if(!isEstimateGasParameters(parameters)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32700,
        message: 'Estimate gas mandatory fields are not presented'
      }
    }
  }

  if (!validateEthAddress(parameters.to)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter "to" should be a valid Ethereum Address.',
      },
    }
  }

  if (!validateEthAddress(parameters.from)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter "from" should be a valid Ethereum Address.',
      },
    }
  }

  const snToAddress: string | StarknetRPCError = await getSnAddressFromEthAddress(parameters.to);

  if(isStarknetRPCError(snToAddress)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: snToAddress
    }
  }

  const snFromAddress: string | StarknetRPCError = await getSnAddressFromEthAddress(parameters.from);

  if(isStarknetRPCError(snFromAddress)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: snFromAddress
    }
  }

  const accountNonce : string | StarknetRPCError = await getStarknetAccountNonce(snFromAddress);
  if(isStarknetRPCError(accountNonce)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: accountNonce
    }
  }

  const targetFunctionSelector: string | null = getFunctionSelectorFromCalldata(parameters.data)

  if(typeof parameters.data === 'undefined' || parameters.data.length < 3 || targetFunctionSelector == null) {
    console.log('it is value transfer')
    // Value transfer
    if(typeof parameters.value === 'undefined') {
      return <RPCError> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: -32701,
          message: 'Non data call must have value parameter'
        }
      }
    }
    const rosettanetCalldata = prepareRosettanetCalldata(parameters.to, Number(accountNonce), 
      BigInt(typeof parameters.maxPriorityFeePerGas === 'undefined' ? 0 : parameters.maxPriorityFeePerGas), 
      BigInt(typeof parameters.maxFeePerGas === 'undefined' ? 0 : parameters.maxFeePerGas), 
      BigInt(typeof parameters.gas === 'undefined' ? 0 : parameters.gas), BigInt(parameters.value),[],[]);


    const estimatedFee: RPCResponse | StarknetRPCError = await callStarknetEstimateFee(snFromAddress, rosettanetCalldata, accountNonce, 
                  BigInt(typeof parameters.value === 'undefined' ? 0 : parameters.value));
    if(isStarknetRPCError(estimatedFee)) {
      return <RPCError> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: estimatedFee
      }
    }
    console.log(estimatedFee)
    const result = estimatedFee.result[0];
 
    if(typeof result.gas_consumed === 'undefined' || typeof result.gas_price === 'undefined' || typeof result.overall_fee === 'undefined') {
      return <RPCError> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: -32500,
          message: 'Wrong data returned from starknet estimate fee.'
        }
      }
    }
      // Fee cok dusuk olunca metamask devam etmiyor
    const totalFee = addHexPrefix(new BigNumber(result.gas_consumed).plus(500000).toString(16))

    return <RPCResponse> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: totalFee
    }
  }

  const targetContract: StarknetContract | StarknetContractReadError = await getContractAbiAndMethods(snToAddress);

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
  // TODO: maybe we need to return 0x instead of error?
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
  )

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

  const rosettanetCalldata = prepareRosettanetCalldata(parameters.to, Number(accountNonce), 
              BigInt(typeof parameters.maxPriorityFeePerGas === 'undefined' ? 0 : parameters.maxPriorityFeePerGas), 
              BigInt(typeof parameters.maxFeePerGas === 'undefined' ? 0 : parameters.maxFeePerGas), 
              BigInt(typeof parameters.gas === 'undefined' ? 0 : parameters.gas), BigInt(typeof parameters.value === 'undefined' ? 0 : parameters.value), 
                  EVMCalldataDecode.calldata, EVMCalldataDecode.directives, starknetFunction);

  const estimatedFee: RPCResponse | StarknetRPCError = await callStarknetEstimateFee(snFromAddress, rosettanetCalldata, accountNonce, 
                BigInt(typeof parameters.value === 'undefined' ? 0 : parameters.value));

  if(isStarknetRPCError(estimatedFee)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: estimatedFee
    }
  }
  console.log(estimatedFee)
  const result = estimatedFee.result[0];

  if(typeof result.gas_consumed === 'undefined' || typeof result.gas_price === 'undefined') {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32500,
        message: 'Wrong data returned from starknet estimate fee.'
      }
    }
  }

  const totalFee = addHexPrefix(new BigNumber(result.gas_consumed).plus(5000).toString(16))
  return <RPCResponse> {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: totalFee
  }
}