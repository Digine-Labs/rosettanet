import { isStarknetRPCError } from "../../types/typeGuards";
import { RPCError, RPCRequest, RPCResponse } from "../../types/types";
import { callStarknet } from "../../utils/callHelper";

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

    if(txDetails == false) {
      const response = await callStarknet({
        jsonrpc: request.jsonrpc,
        method: 'starknet_getBlockWithTxHashes',
        params: [{ block_hash: blockHash }],
        id: request.id,
      })

      if(isStarknetRPCError(response)) {
        return <RPCError>{
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: response,
        }
      }
    } else {
      const response = await callStarknet({
        jsonrpc: request.jsonrpc,
        method: 'starknet_getBlockWithTxs',
        params: [{ block_hash: blockHash }],
        id: request.id,
      })

      if(isStarknetRPCError(response)) {
        return <RPCError>{
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: response,
        }
      }
    }
}