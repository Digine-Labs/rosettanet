import BigNumber from 'bignumber.js'
import { addHexPrefix } from './padding'

interface ActualFeeObject {
  amount: string
  unit: string
}

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

/**
 * Sums the three gas consumption values from Starknet response and returns the total as hex
 *
 * @param l1Gas L1 gas consumed (hex string)
 * @param l1DataGas L1 data gas consumed (hex string)
 * @param l2Gas L2 gas consumed (hex string)
 * @returns Total gas consumption as hex string with '0x' prefix
 */
export function sumTotalGasConsumption(
  l1Gas: string,
  l1DataGas: string,
  l2Gas: string,
): string {
  try {
    // Convert each hex value to BigInt (handles values with or without '0x' prefix)
    const l1GasValue = BigInt(l1Gas)
    const l1DataGasValue = BigInt(l1DataGas)
    const l2GasValue = BigInt(l2Gas)

    // Sum all three values
    const totalGas = l1GasValue + l1DataGasValue + l2GasValue
    const gasWBuffer = totalGas * BigInt(1.1)

    // Convert the sum back to hex with '0x' prefix
    return addHexPrefix(gasWBuffer.toString(16))
  } catch (error) {
    return '0x5208' // Default 21000 gas
  }
}
