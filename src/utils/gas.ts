import BigNumber from 'bignumber.js'
import { addHexPrefix } from './padding'
import { FALLBACK_GAS_LIMIT } from './constants'
import { validateHexString, validateValue } from './validations'

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
  if (
    !validateHexString(l1Gas) ||
    !validateHexString(l1DataGas) ||
    !validateHexString(l2Gas)
  ) {
    throw new Error('Invalid hex string input')
  }

  if (
    validateValue(l1Gas) ||
    validateValue(l1DataGas) ||
    validateValue(l2Gas)
  ) {
    throw new Error('Invalid value input')
  }

  try {
    // Convert each hex value to BigInt (handles values with or without '0x' prefix)
    const l1GasValue = BigInt(l1Gas)
    const l1DataGasValue = BigInt(l1DataGas)
    const l2GasValue = BigInt(l2Gas)

    // Sum all three values
    const totalGas = l1GasValue + l1DataGasValue + l2GasValue
    const buffer = totalGas
    const gasWBuffer = totalGas + buffer

    // Convert the sum back to hex with '0x' prefix
    return addHexPrefix(gasWBuffer.toString(16))
  } catch (error) {
    return FALLBACK_GAS_LIMIT
  }
}
