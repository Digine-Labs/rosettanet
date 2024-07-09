import { RPCErrorNew, RPCRequest, RPCResponse } from '../../types/types'

export async function netVersionHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCErrorNew> {
  if (request.params.length != 0) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should length 0.',
      },
    }
  }

  return {
    jsonrpc: '2.0',
    id: 1,
    result: '0.5.1', // TODO: is it correct form? Compare with infura
    // https://docs.infura.io/api/networks/ethereum/json-rpc-methods/net_version
  }
}
