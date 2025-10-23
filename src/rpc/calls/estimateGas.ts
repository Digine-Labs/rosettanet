import { RPCResponse, RPCRequest, RPCError } from '../../types/types'
import { estimateGasCost } from '../../utils/gas';
import { addHexPrefix } from '../../utils/padding';

export async function estimateGasHandler(request: RPCRequest): Promise<RPCResponse | RPCError> {
  const parameters = request.params[0];

  const totalFee = await estimateGasCost({
    from: parameters.from,
    to: parameters.to,
    gasLimit: parameters.gasLimit,
    gasPrice: parameters.gasPrice,
    maxFeePerGas: parameters.maxFeePerGas,
    maxPriorityFeePerGas: parameters.maxPriorityFeePerGas,
    data: parameters.data,
    value: parameters.value,
    nonce: parameters.nonce,
    gas: parameters.gas
  });

  const totalFeeFri = Math.ceil((totalFee.l1 + totalFee.l1_data + totalFee.l2) * 1.5); // Add buffer and round up
  return <RPCResponse>{
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: addHexPrefix(totalFeeFri.toString(16)),
  }
}