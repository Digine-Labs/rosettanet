/* eslint-disable @typescript-eslint/no-unused-vars */

import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { Transaction } from 'ethers'
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
        message: 'Only EIP1559 transactions are supported at the moment',
      },
    }
  }
  // TODO: chainId check
  // const { from, to, data } = tx;

  // Check if value is non-zero and data is empty it is ether transfer
  // Check if from address rosetta account
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
