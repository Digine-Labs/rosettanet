/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  EVMDecodeError,
  EVMDecodeResult,
  RosettanetSignature,
  RPCError,
  RPCRequest,
  RPCResponse,
  SignedRawTransaction,
  StarknetContract,
  StarknetContractReadError,
  StarknetFunction,
  ValidationError,
} from '../../types/types'
import { Transaction } from 'ethers'
import {
  AccountDeployError,
  AccountDeployResult,
  deployRosettanetAccount,
  getRosettaAccountAddress,
  isRosettaAccountDeployed,
  RosettanetAccountResult,
} from '../../utils/rosettanet'
import { convertHexIntoBytesArray } from '../../utils/felt'
import { callStarknet } from '../../utils/callHelper'
import { validateRawTransaction } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'
import {
  CairoNamedConvertableType,
  generateEthereumFunctionSignatureFromTypeMapping,
  getContractAbiAndMethods,
  getContractsAbi,
  getContractsMethods,
  getEthereumInputsCairoNamed,
  getEthereumInputTypesFromStarknetFunction,
} from '../../utils/starknet'
import {
  ConvertableType,
  initializeStarknetAbi,
} from '../../utils/converters/abiFormatter'
import {
  findStarknetCallableMethod,
  findStarknetFunctionWithEthereumSelector,
  matchStarknetFunctionWithEthereumSelector,
  StarknetCallableMethod,
} from '../../utils/match'
import {
  decodeEVMCalldata,
  decodeCalldataWithTypes,
  getFunctionSelectorFromCalldata,
} from '../../utils/calldata'
import {
  prepareRosettanetCalldata,
  prepareSignature,
  prepareStarknetInvokeTransaction,
} from '../../utils/transaction'
import { Uint256ToU256 } from '../../utils/converters/integer'
import { StarknetInvokeTransaction } from '../../types/transactions.types'
import { getDirectivesForStarknetFunction } from '../../utils/directives'
import { isAccountDeployError, isEVMDecodeError, isRPCError, isSignedRawTransaction, isStarknetContract } from '../../types/typeGuards'
import { createRosettanetSignature } from '../../utils/signature'
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
    broadcastTransaction();
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: 'todo',
    }
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
  /*
  const starknetFunctionsEthereumSignatures = targetContract.methods.map(fn =>
    generateEthereumFunctionSignatureFromTypeMapping(fn, contractTypeMapping),
  )

  const targetStarknetFunctionSelector: string | undefined =
    matchStarknetFunctionWithEthereumSelector(
      starknetFunctionsEthereumSignatures,
      targetFunctionSelector,
    )

  const targetStarknetFunction: StarknetFunction | undefined = findStarknetFunctionWithEthereumSelector(
    targetContract.methods,
    targetFunctionSelector,
    contractTypeMapping,
  )

  if (
    typeof targetStarknetFunction === 'undefined' ||
    typeof targetStarknetFunctionSelector === 'undefined'
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Target Starknet Function is not found.',
      },
    }
  }
 */

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

  /*
pub struct RosettanetCall {
    pub to: EthAddress, // This has to be this account address for multicalls
    pub nonce: u64,
    pub max_priority_fee_per_gas: u128,
    pub max_fee_per_gas: u128,
    pub gas_limit: u64,
    pub value: u256, // To be used future
    pub calldata: Span<felt252>, // Calldata len must be +1 directive len
    pub access_list: Span<AccessListItem>, // TODO: remove this. it always be empty array
    pub directives: Span<u8>, // 0 -> do nothing, 1 -> u256, 2-> address
    pub target_function: Span<felt252> // Function name and types to used to calculate eth func signature
}
  */

  const rosettanetCalldata = prepareRosettanetCalldata(signedValidRawTransaction.to, signedValidRawTransaction.nonce, 
                                                        signedValidRawTransaction.maxPriorityFeePerGas, signedValidRawTransaction.maxFeePerGas, 
                                                        signedValidRawTransaction.gasLimit, signedValidRawTransaction.value, 
                                                        EVMCalldataDecode.calldata, EVMCalldataDecode.directives);
  const invokeTransaction: StarknetInvokeTransaction =
    prepareStarknetInvokeTransaction(
      starknetAccountAddress,
      rosettanetCalldata,
      signedValidRawTransaction.signature.arrayified,
      signedValidRawTransaction.chainId.toString(),
      signedValidRawTransaction.nonce.toString(),
    )
  console.log(signedValidRawTransaction)
  const snResponse: RPCResponse | RPCError = await callStarknet(<RPCRequest>{
    jsonrpc: request.jsonrpc,
    id: request.id,
    params: invokeTransaction,
    method: 'starknet_addInvokeTransaction'
  });

  return snResponse
}

async function broadcastTransaction() {

}