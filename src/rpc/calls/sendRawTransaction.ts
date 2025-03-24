import { Transaction } from 'ethers'
import {
  RPCError,
  RPCRequest,
  RPCResponse,
  SignedRawTransaction,
  StarknetRPCError,
  ValidationError,
} from '../../types/types'
import { validateRawTransaction } from '../../utils/validations'
import {
  isAccountDeployResult,
  isPrepareCalldataError,
  isSignedRawTransaction,
  isStarknetRPCError,
} from '../../types/typeGuards'
import {
  AccountDeployError,
  AccountDeployResult,
  deployRosettanetAccount,
  getRosettaAccountAddress,
  RosettanetAccountResult,
} from '../../utils/rosettanet'
import { callStarknet } from '../../utils/callHelper'
import {
  prepareRosettanetCalldata,
  prepareStarknetInvokeTransaction,
} from '../../utils/transaction'
import { getAccountNonce } from '../../utils/starknet'
import { writeLog } from '../../logger'

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

  const signedValidRawTransaction: SignedRawTransaction | ValidationError =
    validateRawTransaction(tx)
  //console.log(signedValidRawTransaction)
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

  const deployedAccountAddress: RosettanetAccountResult =
    await getRosettaAccountAddress(signedValidRawTransaction.from)
  if (!deployedAccountAddress.isDeployed) {
    return deployAndBroadcastTransaction(request, signedValidRawTransaction)
  }

  const starknetAccountAddress = deployedAccountAddress.contractAddress
  // console.log(starknetAccountAddress)
  const rosettanetCalldata = prepareRosettanetCalldata(
    signedValidRawTransaction,
  )

  if (isPrepareCalldataError(rosettanetCalldata)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32708,
        message: rosettanetCalldata.message,
      },
    }
  }

  const accountNonce = await getAccountNonce(starknetAccountAddress)

  const invokeTx = prepareStarknetInvokeTransaction(
    starknetAccountAddress,
    rosettanetCalldata,
    signedValidRawTransaction.signature.arrayified,
    signedValidRawTransaction,
    accountNonce,
  )

  return await broadcastTransaction(request, invokeTx)
}

async function broadcastTransaction(
  request: RPCRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any,
): Promise<RPCResponse | RPCError> {
  const response: RPCResponse | StarknetRPCError = await callStarknet(<
    RPCRequest
  >{
    jsonrpc: request.jsonrpc,
    id: request.id,
    params: params,
    method: 'starknet_addInvokeTransaction',
  })
  if (isStarknetRPCError(response)) {
    if (response.code == 55) {
      return <RPCError>{
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          message: 'Transaction rejected',
          code: -32003,
        },
      }
    }
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        message: response.message,
        code: -32003,
      },
    }
  }

  const transactionHash = response.result.transaction_hash
  if (typeof transactionHash === 'string') {
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: transactionHash,
    }
  }
  return response
}

async function deployAndBroadcastTransaction(
  request: RPCRequest,
  txn: SignedRawTransaction,
): Promise<RPCResponse | RPCError> {
  const starknetNonce = '0x1'

  // This means account is not registered on rosettanet registry. Lets deploy the address
  const accountDeployResult: AccountDeployResult | AccountDeployError =
    await deployRosettanetAccount(txn)
  if (!isAccountDeployResult(accountDeployResult)) {
    writeLog(2, 'Error at account deployment : ' + accountDeployResult.message)
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32003,
        message: 'Error at account deployment : ' + accountDeployResult.message,
      },
    }
  }

  const rosettanetCalldata = prepareRosettanetCalldata(txn)
  if (isPrepareCalldataError(rosettanetCalldata)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32708,
        message: rosettanetCalldata.message,
      },
    }
  }

  const invokeTx = prepareStarknetInvokeTransaction(
    accountDeployResult.contractAddress,
    rosettanetCalldata,
    txn.signature.arrayified,
    txn,
    starknetNonce,
  )

  return await broadcastTransaction(request, invokeTx)
}
