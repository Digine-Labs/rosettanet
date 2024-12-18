/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetFunction,
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
import { callStarknetNew, getETHBalance, StarknetInvokeParams } from '../../utils/callHelper'
import { validateRawTransaction } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'
import {
  CairoNamedConvertableType,
  generateEthereumFunctionSignatureFromTypeMapping,
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
  findStarknetFunctionWithEthereumSelector,
  matchStarknetFunctionWithEthereumSelector,
} from '../../utils/match'
import {
  decodeCalldataWithFelt252Limit,
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
import { isAccountDeployError } from '../../types/typeGuards'
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

  const signedRawTransaction: string = request.params[0]

  const tx = Transaction.from(signedRawTransaction)

  // TODO: chainId check
  const { from, to, data, value, nonce, chainId, signature } = tx

  if (typeof to !== 'string') {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Init transactions are not supported at the moment.',
      },
    }
  }

  if (typeof from !== 'string') {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid from argument type.',
      },
    }
  }

  if (typeof signature === 'undefined' || signature === null) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Transaction is not signed',
      },
    }
  }

  const deployedAccountAddress: RosettanetAccountResult = await getRosettaAccountAddress(from)
  if (!deployedAccountAddress.isDeployed) {
    // This means account is not registered on rosettanet registry. Lets deploy the address
    const accountDeployResult: AccountDeployResult | AccountDeployError = await deployRosettanetAccount(from)
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

  // Check if from address rosetta account
  // const senderAddress = await getRosettaAccountAddress(from) // Fix here
  const senderAddress = deployedAccountAddress.contractAddress;
  // This is invoke transaction signature
  //const rawTransactionChunks: Array<string> =
  //  convertHexIntoBytesArray(signedRawTransaction)

  //const callerETHBalance: string = await getETHBalance(senderAddress) // Maybe we can also check strk balance too

  const isTxValid = validateRawTransaction(tx)
  if (!isTxValid) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32603,
        message: 'Transaction validation error',
      },
    }
  }

  const targetContract: string = await getSnAddressFromEthAddress(to)
  if (targetContract === '0x0' || targetContract === '0') {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Ethereum address is not in Lens Contract.',
      },
    }
  }

  const contractAbi = await getContractsAbi(targetContract) // Todo: Optimize this get methods, one call enough, methods and custom structs can be derived from abi.

  const contractTypeMapping: Map<string, ConvertableType> =
    initializeStarknetAbi(contractAbi)

  const starknetCallableMethods: Array<StarknetFunction> =
    await getContractsMethods(targetContract)

  const starknetFunctionsEthereumSignatures = starknetCallableMethods.map(fn =>
    generateEthereumFunctionSignatureFromTypeMapping(fn, contractTypeMapping),
  )


  const targetFunctionSelector = getFunctionSelectorFromCalldata(tx.data) // Todo: check if zero

  const targetStarknetFunctionSelector =
    matchStarknetFunctionWithEthereumSelector(
      starknetFunctionsEthereumSignatures,
      targetFunctionSelector,
    )

  const targetStarknetFunction: StarknetFunction | undefined = findStarknetFunctionWithEthereumSelector(
    starknetCallableMethods,
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
  const directives = getDirectivesForStarknetFunction(targetStarknetFunction)
  // burdan devam



  const starknetFunctionEthereumInputTypes: Array<CairoNamedConvertableType> =
    getEthereumInputsCairoNamed(targetStarknetFunction, contractTypeMapping)

  const calldata = tx.data.slice(10)
  const decodedCalldata = decodeCalldataWithFelt252Limit(
    starknetFunctionEthereumInputTypes,
    calldata,
    targetFunctionSelector
  )


  const rosettaSignature: Array<string> = prepareSignature(
    signature.r,
    signature.s,
    signature.v,
    value,
  )
  /*
  pub struct RosettanetCall {
      to: EthAddress, // This has to be this account address for multicalls
      nonce: u64,
      max_priority_fee_per_gas: u128,
      max_fee_per_gas: u128,
      gas_limit: u64,
      value: u256, // To be used future
      calldata: Array<felt252>, // It also includes the function selector so first directive always zero
      directives: Array<bool>, // We use this directives to figure out u256 splitting happened in element in same index For ex if 3rd element of this array is true, it means 3rd elem is low, 4th elem is high of u256
  }
  */

  const rosettanetCalldata = prepareRosettanetCalldata(to, nonce.toString(), tx.maxPriorityFeePerGas === null ? '0' : tx.maxPriorityFeePerGas.toString(), tx.maxFeePerGas === null ? '0' : tx.maxFeePerGas.toString(), tx.gasLimit.toString(), value.toString(), decodedCalldata, directives)
  const invokeTransaction: StarknetInvokeTransaction =
    prepareStarknetInvokeTransaction(
      senderAddress,
      rosettanetCalldata,
      rosettaSignature,
      chainId.toString(),
      nonce.toString(),
    )
  console.log(invokeTransaction)
  const response: RPCResponse | RPCError = await callStarknetNew(<RPCRequest>{
    jsonrpc: request.jsonrpc,
    id: request.id,
    params: invokeTransaction,
    method: 'starknet_addInvokeTransaction'
  });
  console.log(response)
  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: 'todo',
  }
}
