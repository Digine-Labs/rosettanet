/* eslint-disable no-console */

import { RPCResponse, RPCRequest, RPCError } from '../../types/types'
import { estimateGasCost } from '../../utils/gas';
import { addHexPrefix } from '../../utils/padding';

/*
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "l1_data_gas_consumed": "0x400",
            "l1_data_gas_price": "0x545a559",
            "l1_gas_consumed": "0x0",
            "l1_gas_price": "0x1ef3fed292f3",
            "l2_gas_consumed": "0x450c50",
            "l2_gas_price": "0xb2d05e00",
            "overall_fee": "0x303ad8121ac400",
            "unit": "FRI"
        }
    ]
}
    */


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

  const totalFeeFri = (totalFee.l1 + totalFee.l1_data + totalFee.l2) * 1.15; // Add %15 buffer
  // Check account is deployed
  return <RPCResponse>{
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: addHexPrefix(totalFeeFri.toString(16)),
  }
}