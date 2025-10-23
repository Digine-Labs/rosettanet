import BigNumber from 'bignumber.js'
import { estimateExecutionFee, mockValidateCost, precalculateStarknetAccountAddress } from './wrapper'
import { writeLog } from '../logger'
import { isRosettaAccountDeployed } from './rosettanet'
import { getConfigurationProperty } from './configReader'
import { prepareRosettanetCalldataForEstimateFee } from './transaction'
import { getAccountNonceForEstimateFee } from './starknet'
import { ActualFeeObject, EstimateGasParameters, GasCost } from '../types/types'


export function calculateSpentGas(
  max_price_per_unit: string,
  actual_fee: ActualFeeObject,
): string {
  if (actual_fee.unit === 'FRI') {
    const gasPrice = new BigNumber(max_price_per_unit)
    const feePaid = new BigNumber(actual_fee.amount) // STRK paid

    return feePaid.dividedBy(gasPrice).toString(16)
  } else {
    return '0x0' // Wei will be supported later
  }
}
// ABOVE IS OLD CODE REMOVE

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



function sumGas(lhs: GasCost, rhs: GasCost): GasCost {
  return {
    l1: lhs.l1 + rhs.l1,
    l1_data: lhs.l1_data + rhs.l1_data,
    l2: lhs.l2 + rhs.l2
  }
}

function roundUpGasCost(gas: GasCost): GasCost {
  return {
    l1: Math.ceil(gas.l1),
    l1_data: Math.ceil(gas.l1_data),
    l2: Math.ceil(gas.l2)
  }
}


export async function estimateGasCost(parameters: EstimateGasParameters): Promise<GasCost> {
  const BASE_FEE: GasCost = {
    l1: 0,
    l1_data: 512,
    l2: 3000000
  }
  const DEPLOYMENT_COST: GasCost = {
    l1: 0,
    l1_data: 512,
    l2: 2000000
  };
  let totalFee: GasCost = {
    l1: 0,
    l1_data: 0,
    l2: 0
  };

  const from = parameters.from;

  // If from address is not provided, return BASE_FEE
  if (!from) {
    return BASE_FEE;
  }

  // Get Starknet account address
  const precalculatedStarknetAddress = await precalculateStarknetAccountAddress(from);
  if (typeof precalculatedStarknetAddress !== 'string') {
    writeLog(2, 'Starknet rpc error at precalculating from address at estimateGasCost')
    return BASE_FEE;
  }

  const isAccountDeployed = await isRosettaAccountDeployed(precalculatedStarknetAddress, getConfigurationProperty('accountClass'));

  if (!isAccountDeployed) {
    totalFee = sumGas(totalFee, DEPLOYMENT_COST);
    totalFee = sumGas(totalFee, <GasCost>{ l1: 0, l1_data: 2048, l2: 100000000 });
    return roundUpGasCost(totalFee)
  }

  const to: string = parameters.to ? parameters.to : '0x0';
  const data: string = typeof parameters.data === 'string' ? parameters.data : '0x';
  const value: bigint = parseToBigInt(parameters.value, BigInt(0));
  const gasLimit: bigint = parseToBigInt(
    parameters.gas ?? parameters.gasLimit,
    BigInt(3000000),
  );
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
  })();

  const inferredType: number = (parameters.maxFeePerGas != null || parameters.maxPriorityFeePerGas != null) ? 2 : 0;

  const maxFeePerGas: bigint = parseToBigInt(parameters.maxFeePerGas, BigInt(0));
  const maxPriorityFeePerGas: bigint = parseToBigInt(
    parameters.maxPriorityFeePerGas,
    BigInt(0),
  );
  const gasPrice: bigint = parseToBigInt(parameters.gasPrice, BigInt(0));

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
  );

  const validationFee: GasCost = await mockValidateCost(precalculatedStarknetAddress, calldata);

  totalFee = sumGas(totalFee, validationFee);

  // Execution fee

  const accountNonce: string = await getAccountNonceForEstimateFee(precalculatedStarknetAddress);

  const executionFee: GasCost = await estimateExecutionFee(precalculatedStarknetAddress, calldata, accountNonce, value);

  totalFee = sumGas(totalFee, executionFee);

  return roundUpGasCost(totalFee);
}