import { StarknetInvokeTransaction } from '../types/transactions.types'
import {
  EstimateFeeTransaction,
  PrepareCalldataError,
  SignedRawTransaction,
} from '../types/types'
import { getFunctionSelectorFromCalldata, to128Bits } from './calldata'
import {
  BnToU256,
  safeUint256ToU256,
  Uint256ToU256,
} from './converters/integer'
import { addHexPrefix } from './padding'

// Signature will be v,r,s
// Deprecate this one
export function prepareStarknetInvokeTransaction(
  caller: string,
  calldata: Array<string>,
  signature: Array<string>,
  signedRawTransaction: SignedRawTransaction,
  nonce: string,
) {
  const starknetTx: StarknetInvokeTransaction = {
    invoke_transaction: {
      calldata: calldata,
      fee_data_availability_mode: 'L1',
      nonce: addHexPrefix(nonce),
      nonce_data_availability_mode: 'L1',
      paymaster_data: [],
      account_deployment_data: [],
      resource_bounds: getGasObject(signedRawTransaction),
      sender_address: caller,
      signature: signature,
      tip: '0x0',
      version: '0x3',
      type: 'INVOKE',
    },
  }

  return starknetTx
}

export function getGasObject(txn: SignedRawTransaction) {
  //console.log(txn.gasPrice)
  //console.log(txn.maxFeePerGas)
  const gasPrice = txn.maxFeePerGas == null ? txn.gasPrice : txn.maxFeePerGas
  const actualGasPrice = gasPrice == null ? '0x0' : gasPrice

  const gasObject = {
    l2_gas: {
      max_amount: '0x0',
      max_price_per_unit: '0x0',
    },
    l1_gas: {
      max_amount: addHexPrefix(txn.gasLimit.toString(16)),
      max_price_per_unit: addHexPrefix(actualGasPrice.toString(16)),
    },
    l1_data_gas: {
      max_amount: '0x0',
      max_price_per_unit: '0x0',
    },
  }

  return gasObject
}

export function prepareRosettanetCalldataForEstimateFee(from: string, to: string, gasLimit: bigint, data: string, value: bigint, nonce: number, maxFeePerGas: bigint, maxPriorityFeePerGas: bigint, gasPrice: bigint , type: number): string[] {
  const targetFunctionSelector: string | null =
  getFunctionSelectorFromCalldata(data);
  const calldata = []
  if(type == 2) {
    if(targetFunctionSelector == null) {
      calldata.push(addHexPrefix(type.toString(16)))
      calldata.push(to)
      calldata.push(addHexPrefix(nonce.toString(16)))
      calldata.push(addHexPrefix(maxPriorityFeePerGas.toString(16)))
      calldata.push(addHexPrefix(maxFeePerGas.toString(16)))
      calldata.push(addHexPrefix('0')) // Gas price
      calldata.push(addHexPrefix(gasLimit.toString(16)))
      calldata.push(...safeUint256ToU256(value).map(v => addHexPrefix(v)))
      calldata.push(addHexPrefix('0')) // Calldata length
    } else {
      calldata.push(addHexPrefix(type.toString(16)))
      calldata.push(to)
      calldata.push(addHexPrefix(nonce.toString(16)))
      calldata.push(addHexPrefix(maxPriorityFeePerGas.toString(16)))
      calldata.push(addHexPrefix(maxFeePerGas.toString(16)))
      calldata.push(addHexPrefix('0')) // Gas price
      calldata.push(addHexPrefix(gasLimit.toString(16)))
      calldata.push(...safeUint256ToU256(value).map(v => addHexPrefix(v)))

      const evmCalldata = to128Bits(data)
      calldata.push(addHexPrefix(evmCalldata.length.toString(16)))
      calldata.push(...evmCalldata)
    }
  } else {
    if (targetFunctionSelector == null) {
      // Only strk transfer
      calldata.push(addHexPrefix(type.toString(16)))
      calldata.push(to)
      calldata.push(addHexPrefix(nonce.toString(16)))
      calldata.push(addHexPrefix('0'))
      calldata.push(addHexPrefix('0'))
      calldata.push(addHexPrefix(gasPrice.toString(16)))
      calldata.push(addHexPrefix(gasLimit.toString(16)))
      calldata.push(...safeUint256ToU256(value).map(v => addHexPrefix(v)))
      calldata.push(addHexPrefix('0')) // Calldata length

    } else {
      calldata.push(addHexPrefix(type.toString(16)))
      calldata.push(to)
      calldata.push(addHexPrefix(nonce.toString(16)))
      calldata.push(addHexPrefix('0'))
      calldata.push(addHexPrefix('0'))
      calldata.push(addHexPrefix(gasPrice.toString(16)))
      calldata.push(addHexPrefix(gasLimit.toString(16)))
      calldata.push(...safeUint256ToU256(value).map(v => addHexPrefix(v)))

      const evmCalldata = to128Bits(data)
      calldata.push(addHexPrefix(evmCalldata.length.toString(16)))
      calldata.push(...evmCalldata)

    }
  }

  return calldata;
}

// Last version of calldata preparing
export function prepareRosettanetCalldata(
  txn: SignedRawTransaction,
): string[] | PrepareCalldataError {
  try {
    const targetFunctionSelector: string | null =
      getFunctionSelectorFromCalldata(txn.data)
    if (txn.type == 2) {
      // Eip 1559
      const {
        type,
        to,
        nonce,
        maxPriorityFeePerGas,
        maxFeePerGas,
        gasLimit,
        value,
        data,
      } = txn
      if (maxPriorityFeePerGas == null || maxFeePerGas == null) {
        return <PrepareCalldataError>{
          message:
            'maxPriorityFeePerGas or maxFeePerGas fields are null on Eip1559 transaction',
        }
      }
      const calldata: Array<string> = []
      if (targetFunctionSelector == null) {
        // Only strk transfer
        calldata.push(addHexPrefix(type.toString(16)))
        calldata.push(to)
        calldata.push(addHexPrefix(nonce.toString(16)))
        calldata.push(addHexPrefix(maxPriorityFeePerGas.toString(16)))
        calldata.push(addHexPrefix(maxFeePerGas.toString(16)))
        calldata.push(addHexPrefix('0')) // Gas price
        calldata.push(addHexPrefix(gasLimit.toString(16)))
        calldata.push(...safeUint256ToU256(value).map(v => addHexPrefix(v)))
        calldata.push(addHexPrefix('0')) // Calldata length
        return calldata
      } else {
        calldata.push(addHexPrefix(type.toString(16)))
        calldata.push(to)
        calldata.push(addHexPrefix(nonce.toString(16)))
        calldata.push(addHexPrefix(maxPriorityFeePerGas.toString(16)))
        calldata.push(addHexPrefix(maxFeePerGas.toString(16)))
        calldata.push(addHexPrefix('0')) // Gas price
        calldata.push(addHexPrefix(gasLimit.toString(16)))
        calldata.push(...safeUint256ToU256(value).map(v => addHexPrefix(v)))

        const evmCalldata = to128Bits(data)
        calldata.push(addHexPrefix(evmCalldata.length.toString(16)))
        calldata.push(...evmCalldata)

        return calldata
      }
    } else if (txn.type == 0) {
      // Legacy
      const { type, to, nonce, gasPrice, gasLimit, value, data } = txn
      if (gasPrice == null) {
        return <PrepareCalldataError>{
          message: 'Gas price field is mandatory for legacy transactions',
        }
      }
      const calldata: Array<string> = []
      if (targetFunctionSelector == null) {
        // Only strk transfer
        calldata.push(addHexPrefix(type.toString(16)))
        calldata.push(to)
        calldata.push(addHexPrefix(nonce.toString(16)))
        calldata.push(addHexPrefix('0'))
        calldata.push(addHexPrefix('0'))
        calldata.push(addHexPrefix(gasPrice.toString(16)))
        calldata.push(addHexPrefix(gasLimit.toString(16)))
        calldata.push(...safeUint256ToU256(value).map(v => addHexPrefix(v)))
        calldata.push(addHexPrefix('0')) // Calldata length
        return calldata
      } else {
        calldata.push(addHexPrefix(type.toString(16)))
        calldata.push(to)
        calldata.push(addHexPrefix(nonce.toString(16)))
        calldata.push(addHexPrefix('0'))
        calldata.push(addHexPrefix('0'))
        calldata.push(addHexPrefix(gasPrice.toString(16)))
        calldata.push(addHexPrefix(gasLimit.toString(16)))
        calldata.push(...safeUint256ToU256(value).map(v => addHexPrefix(v)))

        const evmCalldata = to128Bits(data)
        calldata.push(addHexPrefix(evmCalldata.length.toString(16)))
        calldata.push(...evmCalldata)

        return calldata
      }
    } else {
      return <PrepareCalldataError>{
        message: 'Only Eip1559 or Legacy transactions are supported',
      }
    }
  } catch (ex) {
    return <PrepareCalldataError>{
      message: typeof ex === 'string' ? ex : (ex as Error).message,
    }
  }
}

export function prepareSignature(
  r: string,
  s: string,
  v: number,
  value: bigint,
): Array<string> {
  return [
    ...Uint256ToU256(r.replace('0x', '')).map(rv => addHexPrefix(rv)),
    ...Uint256ToU256(s.replace('0x', '')).map(sv => addHexPrefix(sv)),
    v.toString(16),
    ...BnToU256(value),
  ]
}
