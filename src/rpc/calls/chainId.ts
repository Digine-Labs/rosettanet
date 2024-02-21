import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { forwardRequest } from '../../utils/callHelper'

export async function chainIdHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  return forwardRequest(request, 'starknet_chainId', []);
}