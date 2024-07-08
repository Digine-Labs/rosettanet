import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function chainIdHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // TODO: dynamic network from env?

  if (request.params.length != 0) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params are not expected',
    }
  }

  /*
  const response: RPCResponse | string = await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_chainId',
    params: [],
    id: request.id,
  })

  if (typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  } */

  ///
  // TODO: Starknet chain id length is too high for metamask and trustwallet.
  // we use SNSEP for sepolia SNMAN for mainnet
  // const formattedChainId = response.result === '0x534e5f5345504f4c4941' ? '0x534e534550' : '0x534e4d414e'

  // Return directly SNSEP while developing
  const chainId = '0x534e534550'
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: chainId,
  }
}
