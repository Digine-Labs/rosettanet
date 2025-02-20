/* eslint-disable no-console */
import {
  RPCResponse,
  RPCRequest,
  RPCError
} from '../../types/types'


export async function estimateGasHandler(request: RPCRequest): Promise<RPCResponse|RPCError> {
  try {
    const parameters = request.params[0];
    const from = parameters.from == null ? parameters.to : parameters.from;
    const to = parameters.to;
    //const targetFunctionSelector: string | null = getFunctionSelectorFromCalldata(parameters.data)

    if(from === to && from != null) {
      return <RPCResponse> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        result: '0x15F90'
      }
    } else {
      return <RPCResponse> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        result: '0x5208'
      }
    }
  } catch (ex) {
    return <RPCResponse> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: '0x5208'
    }
  }
}
