import { RPCError, RPCRequest, RPCResponse } from "../../types/types";

export async function getBlockByHashHandler(request: RPCRequest): Promise<RPCResponse | RPCError>{
    if(!Array.isArray(request.params)) {
        return {
            jsonrpc: request.jsonrpc,
            id: request.id,
            error: {
              code: -32602,
              message: 'Invalid argument, Parameter must be array',
            },
        }
    }
    if (request.params.length != 2) {
        return {
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            code: -32602,
            message: 'Invalid argument, Parameter length must be 2.',
          },
        }
    }

    const blockHash = request.params[0] as string;
    const txDetails = request.params[1] as boolean;

}