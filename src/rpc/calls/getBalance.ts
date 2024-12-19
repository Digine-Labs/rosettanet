import { NativeBalance, RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { getSTRKBalance } from '../../utils/callHelper'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'
import { isRPCError } from '../../types/typeGuards'

export async function getBalanceHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 0) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter should be a valid Ethereum Address and block parameter.',
      },
    }
  }

  const ethAddress = request.params[0] as string
  if (!validateEthAddress(ethAddress)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter should be a valid Ethereum Address.',
      },
    }
  }

  const snAddress: string | RPCError = await getSnAddressFromEthAddress(ethAddress)

  if (isRPCError(snAddress)) {
    return snAddress
  }

  const balance : NativeBalance | RPCError = await getSTRKBalance(snAddress);

  if(isRPCError(balance)) {
    return balance
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: balance.ethereumFormat,
  }
}
