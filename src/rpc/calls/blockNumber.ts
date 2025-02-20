import { getCachedBlockNumber } from '../../cache/blockNumber'
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function blockNumberHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {

  const cachedBlockNumber = getCachedBlockNumber();

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: cachedBlockNumber,
  }
}
