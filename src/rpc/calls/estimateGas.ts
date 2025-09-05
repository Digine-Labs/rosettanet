/* eslint-disable no-console */
import { writeLog } from '../../logger';
import { RPCResponse, RPCRequest, RPCError } from '../../types/types'
import { getConfigurationProperty } from '../../utils/configReader';
import { addHexPrefix } from '../../utils/padding';
import { isRosettaAccountDeployed } from '../../utils/rosettanet';
import { mockValidateCost, precalculateStarknetAccountAddress } from '../../utils/wrapper';

export async function estimateGasHandlerx(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  try {
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: '0x5208',
    }
  } catch (ex) {
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: '0x5208',
    }
  }
}
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
  interface GasCost {
    l1: number,
    l1_data: number,
    l2: number
  }

function sumGas(lhs: GasCost, rhs: GasCost): GasCost {
  return {
    l1: lhs.l1 + rhs.l1,
    l1_data: lhs.l1_data + rhs.l1_data,
    l2: lhs.l2 + rhs.l2
  }
}
export async function estimateGasHandler(request: RPCRequest): Promise<RPCResponse | RPCError> {
  const BASE_FEE = 21000;
  const DEPLOYMENT_COST: GasCost = {
    l1: 0,
    l1_data: 512,
    l2: 2000000
  };
  // Not: Eger account deploylu degilse. Estimate fee responseunda deploy costunuda ekle
  let total_fee: GasCost = {
    l1: 0,
    l1_data: 0,
    l2: 0
  };
  const parameters = request.params[0];

  const from = parameters.from;
  
  // If from address is not provided, return BASE_FEE
  if (!from) {
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: addHexPrefix(BASE_FEE.toString(16)),
    }
  }

  const precalculatedStarknetAddress = await precalculateStarknetAccountAddress(from);
  if(typeof precalculatedStarknetAddress !== 'string') {
    writeLog(2, 'Starknet rpc error at precalculating from address at estimateGas')
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: addHexPrefix(BASE_FEE.toString(16)),
    }
  }
  const isAccountDeployed = await isRosettaAccountDeployed(precalculatedStarknetAddress, getConfigurationProperty('accountClass'));

  if(!isAccountDeployed) {
    total_fee = sumGas(total_fee, DEPLOYMENT_COST)
  }
  
  const validationFee = await mockValidateCost(precalculatedStarknetAddress, ); // TODO: add rosettanet calldata.
  
  // Check account is deployed
  return <RPCResponse>{
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: '0x5208',
  }
}