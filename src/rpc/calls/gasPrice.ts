import { getCachedGasPrice, SyncedL1Gas } from '../../cache/gasPrice'
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { addHexPrefix } from '../../utils/padding';

export async function gasPriceHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {

  const gasPrices: SyncedL1Gas = getCachedGasPrice();

  // TODO: fri cok yuksek gidiyor. wei cok dusuk
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: gasPrices.fri,
  }
}
