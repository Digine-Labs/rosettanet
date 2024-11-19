/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetFunction,
} from '../../types/types'
import { Transaction } from 'ethers'
import {
  getRosettaAccountAddress,
  isRosettaAccountDeployed,
} from '../../utils/rosettanet'
import { convertHexIntoBytesArray } from '../../utils/felt'
import { getETHBalance } from '../../utils/callHelper'
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

  if (tx.type != 2) {
    // TODO: Alpha version only supports EIP1559
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32603,
        message: 'Only EIP1559 transactions are supported at the moment.',
      },
    }
  }
  // TODO: chainId check
  const { from, to, data, value } = tx

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
  // Check if value is non-zero and data is empty it is ether transfer
  if (value.toString() !== '0') {
    // If data is zero and value is 0 then it is usual ether transfer
    if (data !== '0x') {
      // If data is non-zero it is payable function call. This will be supported at new version
      return {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: -32603,
          message: 'Payable function calls are not supported at the moment.',
        },
      }
    }
    // TODO: send ether transfer, approach might be similar, no need to call different function
    // Send ether tx must be passed directly. Account contract will handles that.
  }

  // Check if from address rosetta account
  const senderAddress = await getRosettaAccountAddress(from)

  // This is invoke transaction signature
  const rawTransactionChunks: Array<string> =
    convertHexIntoBytesArray(signedRawTransaction)

  const callerETHBalance: string = await getETHBalance(senderAddress) // Maybe we can also check strk balance too

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
  if (targetContract === '0x0') {
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

  const targetStarknetFunction = findStarknetFunctionWithEthereumSelector(
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
  /*const starknetFunctionEthereumInputTypes =
    getEthereumInputTypesFromStarknetFunction(
      targetStarknetFunction,
      contractTypeMapping,
    )
  const calldata = tx.data.slice(10)

  const decodedCalldata = decodeCalldataWithTypes(
    starknetFunctionEthereumInputTypes,
    calldata, 
  )*/

  const starknetFunctionEthereumInputTypes: Array<CairoNamedConvertableType> = getEthereumInputsCairoNamed(targetStarknetFunction, contractTypeMapping);
  const calldata = tx.data.slice(10);
  const decodedCalldata = decodeCalldataWithFelt252Limit(starknetFunctionEthereumInputTypes,calldata);
  // calldata is now in felt range and can be passed directly as starknet calldata
  // TODO: improve decoding tests and make this function async with address formatting


  // Array of all inputs
  // TODO: decodeCalldataWithTypes fonksiyonuna parametreleri ethereum halini array olarak gönder [uint etc. etc.]
  // const decodedCalldata = decodeCalldataWithTypes(,calldata);

  // Find current account class.
  // const isAccountDeployed = await isRosettaAccountDeployed(senderAddress) // Checks that class hash of given address is same with config

  // If not deployed address -> check if there is a balance
  // If there is a balance, try to deploy via factory or any from zero deployment
  // If no balance then revert rpc call
  // If deployed -> Check if it is rosetta account
  // If it is rosetta account proceed this check
  // If it is not rosetta account, revert rpc call
  // Check if data is non empty
  // If data empty, it is ether transfer, just proceed the call
  // If data is non-empty parse calldata
  // 1) Try to find target contract starknet address from lens
  // If target contract is not registered on lens, revert rpc call
  // If target contract is registered, try to find function with selector matching like we did in ethCall
  // If no function matches, revert rpc call
  // 2) Parse calldata according to bitsizes taken from starknet ABI
  // If non supported type is exist, revert rpc call
  // 3) Prepare a list of bit locations for parameters
  // For example transfer(address,uint256) => [0, 160] or [160, 160+256]
  // Also for arrays, each elements location has to be passed into this array too
  // This array will be used to verify & prepare calldata on cairo contract
  // 4) Prepare starknet transaction "addInvokeTransaction"
  // calldata will be bit locations
  // signature will be signed raw transaction hex, parsed into 252 bits
  // So calldata will be readen from signature in cairo

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: 'todo',
  }
}
