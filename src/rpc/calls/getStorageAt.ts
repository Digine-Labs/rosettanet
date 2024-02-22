import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { forwardRequest } from '../../utils/callHelper'
export async function getStorageAtHandler(
    request: RPCRequest,
  ): Promise<RPCResponse | RPCError> {
    return forwardRequest(request, "starknet_getStorageAt", request.params);
  }