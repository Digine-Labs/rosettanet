/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  EVMDecodeError,
  EVMDecodeResult,
  RPCError,
  RPCRequest,
  RPCResponse,
  SignedRawTransaction,
  StarknetContract,
  StarknetContractReadError,
  ValidationError,
} from '../../types/types'
import { Transaction } from 'ethers'
import {
  AccountDeployError,
  AccountDeployResult,
  deployRosettanetAccount,
  getRosettaAccountAddress,
  RosettanetAccountResult,
} from '../../utils/rosettanet'
import { callStarknet } from '../../utils/callHelper'
import { validateRawTransaction } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'
import {
  CairoNamedConvertableType,
  getContractAbiAndMethods,
  getEthereumInputsCairoNamed,
} from '../../utils/starknet'
import {
  ConvertableType,
  initializeStarknetAbi,
} from '../../utils/converters/abiFormatter'
import {
  findStarknetCallableMethod,
  StarknetCallableMethod,
} from '../../utils/match'
import {
  decodeEVMCalldata,
  getFunctionSelectorFromCalldata,
} from '../../utils/calldata'
import {
  prepareRosettanetCalldata,
  prepareStarknetInvokeTransaction,
} from '../../utils/transaction'
import { StarknetInvokeTransaction } from '../../types/transactions.types'

import { isAccountDeployError, isEVMDecodeError, isRPCError, isSignedRawTransaction, isStarknetContract } from '../../types/typeGuards'

export async function sendRawTransactionHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 1) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should length 1.',
      },
    }
  }

  if (typeof request.params[0] !== 'string') {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument type, parameter should be string.',
      },
    }
  }

  const rawTxn: string = request.params[0]
  const tx = Transaction.from(rawTxn)

  const signedValidRawTransaction: SignedRawTransaction | ValidationError  = validateRawTransaction(tx)

  if (!isSignedRawTransaction(signedValidRawTransaction)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32603,
        message: signedValidRawTransaction.message,
      },
    }
  }


  const deployedAccountAddress: RosettanetAccountResult = await getRosettaAccountAddress(signedValidRawTransaction.from)
  if (!deployedAccountAddress.isDeployed) {
    // This means account is not registered on rosettanet registry. Lets deploy the address
    const accountDeployResult: AccountDeployResult | AccountDeployError = await deployRosettanetAccount(signedValidRawTransaction.from)
    if(isAccountDeployError(accountDeployResult)) {
      return {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: accountDeployResult.code,
          message: 'Error at account deployment : ' + accountDeployResult.message,
        },
      }
    }

    // eslint-disable-next-line no-console
    console.log(`Account Deployed ${accountDeployResult.contractAddress}`)
  }

  const starknetAccountAddress = deployedAccountAddress.contractAddress;

  const targetContractAddress: string | RPCError = await getSnAddressFromEthAddress(signedValidRawTransaction.to)
  if(isRPCError(targetContractAddress)) {
    return targetContractAddress
  }

  const targetFunctionSelector: string | null = getFunctionSelectorFromCalldata(signedValidRawTransaction.data)
  if(targetFunctionSelector === null) {

    // Early exit. there is no function call only strk transfer
    const rosettanetCalldata = prepareRosettanetCalldata(signedValidRawTransaction.to,signedValidRawTransaction.nonce, 
      signedValidRawTransaction.maxPriorityFeePerGas, signedValidRawTransaction.maxFeePerGas, 
      signedValidRawTransaction.gasLimit, signedValidRawTransaction.value,[],[]);
    const invokeTransaction: StarknetInvokeTransaction =
    prepareStarknetInvokeTransaction(
      starknetAccountAddress,
      rosettanetCalldata,
      signedValidRawTransaction.signature.arrayified,
      signedValidRawTransaction
    )
    return await broadcastTransaction(request, invokeTransaction);
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

  const calldata = signedValidRawTransaction.data.slice(10)
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

  const rosettanetCalldata = prepareRosettanetCalldata(signedValidRawTransaction.to, signedValidRawTransaction.nonce, 
                                                        signedValidRawTransaction.maxPriorityFeePerGas, signedValidRawTransaction.maxFeePerGas, 
                                                        signedValidRawTransaction.gasLimit, signedValidRawTransaction.value, 
                                                        EVMCalldataDecode.calldata, EVMCalldataDecode.directives, starknetFunction);
  const invokeTransaction: StarknetInvokeTransaction =
    prepareStarknetInvokeTransaction(
      starknetAccountAddress,
      rosettanetCalldata,
      signedValidRawTransaction.signature.arrayified,
      signedValidRawTransaction
    )

  return broadcastTransaction(request, invokeTransaction)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function broadcastTransaction(request: RPCRequest, params: any): Promise<RPCResponse | RPCError> {

  return await callStarknet(<RPCRequest>{
    jsonrpc: request.jsonrpc,
    id: request.id,
    params: params,
    method: 'starknet_addInvokeTransaction'
  });
}