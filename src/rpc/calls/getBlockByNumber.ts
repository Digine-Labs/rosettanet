import { isHexString } from "ethers";
import { RPCError, RPCRequest, RPCResponse } from "../../types/types";
import { hexToDecimal } from "../../utils/converters/integer";
import { callStarknet } from "../../utils/callHelper";
import { isStarknetRPCError } from "../../types/typeGuards";
import { parseBlockData } from "./getBlockByHash";
import { writeLog } from "../../logger";

export async function getBlockByNumberHandler(request: RPCRequest): Promise<RPCResponse | RPCError> {
  if (!Array.isArray(request.params)) {
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

  const blockNumber = blockNumberParameter(request.params[0]);
  const txDetails = request.params[1] as boolean;
  writeLog(1, "Blocknumber: " + blockNumber)
  let blockData;

  if (txDetails == false) {
    const response = await callStarknet({
      jsonrpc: request.jsonrpc,
      method: 'starknet_getBlockWithTxHashes',
      params: [blockNumber],
      id: request.id,
    })

    if (isStarknetRPCError(response)) {
      return <RPCError>{
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: response,
      }
    }

    blockData = response.result;
  } else {
    const response = await callStarknet({
      jsonrpc: request.jsonrpc,
      method: 'starknet_getBlockWithTxs',
      params: [blockNumber],
      id: request.id,
    })

    if (isStarknetRPCError(response)) {
      return <RPCError>{
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: response,
      }
    }
    blockData = response.result;
  }

  return parseBlockData(request, blockData, txDetails);
}

function blockNumberParameter(param: number | string): { block_number: string | number } | string {
  if (typeof param === 'number') {
    return {
      block_number: param
    }
  }
  if (typeof param === 'string') {
    if (isHexString(param)) {
      return {
        block_number: hexToDecimal(param)
      }
    } else {
      return param === "latest" ? "latest" : "pending"
    }
  }
  return { block_number: 0 }
}