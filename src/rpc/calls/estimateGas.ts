/* eslint-disable no-console */
import { writeLog } from '../../logger';
import { RPCResponse, RPCRequest, RPCError } from '../../types/types'
import { getConfigurationProperty } from '../../utils/configReader';
import { addHexPrefix } from '../../utils/padding';
import { isRosettaAccountDeployed } from '../../utils/rosettanet';
import { getAccountNonce } from '../../utils/starknet';
import { prepareRosettanetCalldataForEstimateFee } from '../../utils/transaction';
import { estimateExecutionFee, mockValidateCost, precalculateStarknetAccountAddress } from '../../utils/wrapper';

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
export interface GasCost {
  l1: number,
  l1_data: number,
  l2: number
} // TODO: Belki bigint yapmak daha mantikli olabilir?

function sumGas(lhs: GasCost, rhs: GasCost): GasCost {
  return {
    l1: lhs.l1 + rhs.l1,
    l1_data: lhs.l1_data + rhs.l1_data,
    l2: lhs.l2 + rhs.l2
  }
}
export async function estimateGasHandler(request: RPCRequest): Promise<RPCResponse | RPCError> {
  const BASE_FEE = 3000000; // 3m gas if no from addr
  const DEPLOYMENT_COST: GasCost = {
    l1: 0,
    l1_data: 512,
    l2: 2000000
  };
  // Not: Eger account deploylu degilse. Estimate fee responseunda deploy costunuda ekle
  let totalFee: GasCost = {
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
    totalFee = sumGas(totalFee, DEPLOYMENT_COST)
  }

  const to: string = parameters.to ? parameters.to : '0x0'
  const data: string = typeof parameters.data === 'string' ? parameters.data : '0x'

  const parseToBigInt = (v: unknown, fallback: bigint): bigint => {
    if (v === undefined || v === null) return fallback
    if (typeof v === 'bigint') return v
    if (typeof v === 'number') return BigInt(v)
    if (typeof v === 'string') {
      try {
        return BigInt(v)
      } catch {
        return fallback
      }
    }
    return fallback
  }

  const value: bigint = parseToBigInt(parameters.value, BigInt(0))
  const gasLimit: bigint = parseToBigInt(
    parameters.gas ?? parameters.gasLimit,
    BigInt('0x5208'),
  )
  const nonce: number = (() => {
    const n = parameters.nonce
    if (n === undefined || n === null) return 0
    if (typeof n === 'number') return n
    if (typeof n === 'bigint') return Number(n)
    if (typeof n === 'string') {
      try {
        return Number(BigInt(n))
      } catch {
        return 0
      }
    }
    return 0
  })()

  const explicitType = parameters.type
  const inferredType: number =
    explicitType !== undefined && explicitType !== null
      ? typeof explicitType === 'number'
        ? explicitType
        : (() => {
            try {
              return Number(BigInt(explicitType))
            } catch {
              return 0
            }
          })()
      : (parameters.maxFeePerGas != null || parameters.maxPriorityFeePerGas != null)
      ? 2
      : 0

  const maxFeePerGas: bigint = parseToBigInt(parameters.maxFeePerGas, BigInt(0))
  const maxPriorityFeePerGas: bigint = parseToBigInt(
    parameters.maxPriorityFeePerGas,
    BigInt(0),
  )
  const gasPrice: bigint = parseToBigInt(parameters.gasPrice, BigInt(0))

  const calldata = prepareRosettanetCalldataForEstimateFee(
    from,
    to,
    gasLimit,
    data,
    value,
    nonce,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasPrice,
    inferredType,
  )
  
  const validationFee: GasCost = await mockValidateCost(precalculatedStarknetAddress, calldata);

  totalFee = sumGas(totalFee, validationFee);

  // Execution fee

  const accountNonce: string = await getAccountNonce(precalculatedStarknetAddress);

  const executionFee: GasCost = await estimateExecutionFee(precalculatedStarknetAddress, calldata, accountNonce);

  totalFee = sumGas(totalFee, executionFee);

  // Math

  const totalFeeFri = (totalFee.l1 + totalFee.l1_data + totalFee.l2) * 1.15; // Add %15 buffer
  
  // Check account is deployed
  return <RPCResponse>{
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: addHexPrefix(totalFeeFri.toString(16)),
  }
}