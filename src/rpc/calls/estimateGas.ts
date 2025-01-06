/* eslint-disable no-console */
import {
  RPCResponse,
  RPCRequest,
  RPCError,
  StarknetRPCError,
  StarknetContract,
  StarknetContractReadError,
  EVMDecodeResult,
  EVMDecodeError,
  EstimateFeeTransaction,
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
import { isEVMDecodeError, isSimulateTransaction, isStarknetContract, isStarknetRPCError } from '../../types/typeGuards'
import { prepareRosettanetCalldataForEstimatingFee } from '../../utils/transaction'
import BigNumber from 'bignumber.js'
import { ConvertableType, initializeStarknetAbi } from '../../utils/converters/abiFormatter'
import { findStarknetCallableMethod, StarknetCallableMethod } from '../../utils/match'
import { addHexPrefix } from '../../utils/padding'
import { safeUint256ToU256 } from '../../utils/converters/integer'

export async function estimateGasHandler(request: RPCRequest): Promise<RPCResponse|RPCError> {
  return <RPCResponse> {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: '0x5208'
  }
}

export async function estimateGasHandlerx(request: RPCRequest): Promise<RPCResponse | RPCError> {
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
  if(!isSimulateTransaction(parameters)) {
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

  const from = parameters.from == null ? parameters.to : parameters.from; // We use same address if not from passed

  if (!validateEthAddress(from)) {
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
    if(snToAddress.code == -32700) {
      return {
        jsonrpc: '2.0',
        id: request.id,
        result: '0x5cec', // Constant value transfer gas to empty account
      }
    }
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: snToAddress
    }
  }

  const snFromAddress: string | StarknetRPCError = await getSnAddressFromEthAddress(from);

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

  const gasLimit = parameters.gas == null ? parameters.gasLimit : parameters.gas;
  const actualGasLimit = gasLimit == null ? '0x0' : gasLimit

  const actualValue = parameters.value == null ? BigInt(0) : BigInt(parameters.value)

  const value_u256 = safeUint256ToU256(actualValue).map(v => addHexPrefix(v));
  const signature = ["0x0", "0x0", "0x0", "0x0", "0x0", ...value_u256]

  // const actualData = parameters.data == null ? '0x' : parameters.data


  // If no calldata passed, it can be considered as value transfer
  if(typeof parameters.data === 'undefined' || parameters.data == null || parameters.data.length < 3 || targetFunctionSelector == null) {
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
      const estimateFeeTransaction: EstimateFeeTransaction = {
        from, to: parameters.to,
        maxAmountGas: actualGasLimit,
        maxGasPricePerUnit: parameters.gasPrice == null ? '0x0' : parameters.gasPrice,
        signature, calldata: [], directives: [], nonce:accountNonce, value: actualValue, targetFunction: undefined
      }

      const rosettanetCalldata = prepareRosettanetCalldataForEstimatingFee(estimateFeeTransaction);

      //const rosettanetCalldata = prepareRosettanetCalldataForEstimateTransaction(parameters, [], []);


      const estimatedFee: RPCResponse | StarknetRPCError = await callStarknetEstimateFee(snFromAddress, estimateFeeTransaction, rosettanetCalldata);
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
      //const totalFee = addHexPrefix(new BigNumber(result.gas_consumed).plus(500000).toString(16))

      return <RPCResponse> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        result: '0x5208' // Constant min gas if value transfer
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

  const estimateFeeTransaction: EstimateFeeTransaction = {
    from, to: parameters.to,
    maxAmountGas: actualGasLimit,
    maxGasPricePerUnit: parameters.gasPrice == null ? '0x0' : parameters.gasPrice,
    signature, calldata: EVMCalldataDecode.calldata, directives: EVMCalldataDecode.directives, nonce:accountNonce, value: actualValue, targetFunction: starknetFunction
  }

  const rosettanetCalldata = prepareRosettanetCalldataForEstimatingFee(estimateFeeTransaction);
  //const rosettanetCalldata: Array<string> | PrepareCalldataError = prepareRosettanetCalldataForEstimateTransaction(parameters, EVMCalldataDecode.calldata, EVMCalldataDecode.directives, starknetFunction);


  const estimatedFee: RPCResponse | StarknetRPCError = await callStarknetEstimateFee(snFromAddress, estimateFeeTransaction, rosettanetCalldata);

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
    result: totalFee // We can return 21000 in all cases its too big for starknet
  }
}