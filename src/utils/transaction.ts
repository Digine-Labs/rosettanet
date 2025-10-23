import { StarknetInvokeTransaction } from '../types/transactions.types'
import {
  PrepareCalldataError,
  SignedRawTransaction,
  ResourceBounds
} from '../types/types'
import { getFunctionSelectorFromCalldata, to128Bits } from './calldata'
import {
  safeUint256ToU256,
} from './converters/integer'
import { addHexPrefix } from './padding'

// Signature will be v,r,s
// Deprecate this one
export function prepareStarknetInvokeTransaction(
  caller: string,
  calldata: Array<string>,
  signature: Array<string>,
  //signedRawTransaction: SignedRawTransaction,
  nonce: string,
  resourceBounds: ResourceBounds
) {
  const starknetTx: StarknetInvokeTransaction = {
    invoke_transaction: {
      calldata: calldata,
      fee_data_availability_mode: 'L1',
      nonce: addHexPrefix(nonce),
      nonce_data_availability_mode: 'L1',
      paymaster_data: [],
      account_deployment_data: [],
      resource_bounds: resourceBounds,
      sender_address: caller,
      signature: signature,
      tip: '0x0',
      version: '0x3',
      type: 'INVOKE',
    },
  }

  return starknetTx
}

export function prepareRosettanetCalldataForEstimateFee(from: string, to: string, gasLimit: bigint, data: string, value: bigint, nonce: number, maxFeePerGas: bigint, maxPriorityFeePerGas: bigint, gasPrice: bigint, type: number): string[] {
  const targetFunctionSelector: string | null =
    getFunctionSelectorFromCalldata(data);
  const calldata = []
  if (type == 2) {
    if (targetFunctionSelector == null) {
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
