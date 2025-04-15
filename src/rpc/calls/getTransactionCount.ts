import { isStarknetRPCError } from '../../types/typeGuards'
import {
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetRPCError,
} from '../../types/types'
import { getRosettanetAccountNonce } from '../../utils/rosettanet'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressWithFallback } from '../../utils/wrapper'

/*
Params:
Eth address
block specifier, 
string => hex string or latest pending etc
number => decimal block number
*/

export async function getTransactionCountHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length == 0 || request.params.length > 2) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter should be valid Ethereum Address and block identifier.',
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
          'Invalid argument, Parameter should be valid Ethereum Address.',
      },
    }
  }



  const snAddress: string | StarknetRPCError =
    await getSnAddressWithFallback(ethAddress)
  if (isStarknetRPCError(snAddress)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: snAddress,
    }
  }

  const rosettanetNonce = await getRosettanetAccountNonce(snAddress)

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: rosettanetNonce,
  }
}
