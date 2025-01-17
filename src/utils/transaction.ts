import { StarknetInvokeTransaction } from '../types/transactions.types'
import { EstimateFeeTransaction, PrepareCalldataError, SignedRawTransaction } from '../types/types'
import { BnToU256, safeUint256ToU256, Uint256ToU256 } from './converters/integer'
import { asciiToHex } from './encoding'
import { convertHexChunkIntoFeltArray } from './felt'
import { StarknetCallableMethod } from './match'
import { addHexPrefix } from './padding'

// Signature will be v,r,s
// Deprecate this one
export function prepareStarknetInvokeTransaction(
  caller: string,
  calldata: Array<string>,
  signature: Array<string>,
  signedRawTransaction: SignedRawTransaction
) {
  const starknetTx: StarknetInvokeTransaction = {
    invoke_transaction: {
      calldata: calldata,
      fee_data_availability_mode: 'L1',
      nonce: signedRawTransaction.nonce.toString(),
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

function getGasObject(txn: SignedRawTransaction) {
  //console.log(txn.gasPrice)
  //console.log(txn.maxFeePerGas)
  const gasPrice = txn.maxFeePerGas == null ? txn.gasPrice : txn.maxFeePerGas
  const actualGasPrice = gasPrice == null ? '0x0' : gasPrice

  const gasObject =  {
          l1_gas: {
              max_amount: addHexPrefix(txn.gasLimit.toString(16)),
              max_price_per_unit: addHexPrefix(actualGasPrice.toString(16))
          },
          l2_gas: {
              max_amount: "0x0",
              max_price_per_unit: "0x0"
          }
  }

  return gasObject
}

function prepareRosettanetCalldataEip1559(
  to: string,
  nonce: number,
  max_priority_fee_per_gas: bigint,
  max_fee_per_gas: bigint,
  gas_limit: bigint,
  value: bigint,
  calldata: Array<string>,
  directives: Array<number>,
  targetFunction?: StarknetCallableMethod
): Array<string> {
  // TODO add final validations for parameters
  if(calldata.length == 0 && directives.length == 0) {
      
    const finalCalldata: Array<string> = []

    finalCalldata.push(to)
    finalCalldata.push(addHexPrefix(nonce.toString(16)))
    finalCalldata.push(addHexPrefix(max_priority_fee_per_gas.toString(16)))
    finalCalldata.push(addHexPrefix(max_fee_per_gas.toString(16)))
    finalCalldata.push(addHexPrefix(gas_limit.toString(16)))

    const value_u256 = safeUint256ToU256(value)
    finalCalldata.push(...(value_u256.map(v => addHexPrefix(v))))

    finalCalldata.push(addHexPrefix(calldata.length.toString(16)))
    finalCalldata.push(addHexPrefix('0')) // Access list length

    finalCalldata.push(addHexPrefix(directives.length.toString(16)))

    finalCalldata.push(addHexPrefix('0')) // Target function length
    return finalCalldata
  }

  if(typeof targetFunction === 'undefined') {
    throw 'Target function not empty but calldata and directives are empty'
  }
  
  const finalCalldata: Array<string> = []

  finalCalldata.push(to)
  finalCalldata.push(addHexPrefix(nonce.toString(16)))
  finalCalldata.push(addHexPrefix(max_priority_fee_per_gas.toString(16)))
  finalCalldata.push(addHexPrefix(max_fee_per_gas.toString(16)))
  finalCalldata.push(addHexPrefix(gas_limit.toString(16)))

  const value_u256 = Uint256ToU256(value.toString())
  finalCalldata.push(...(value_u256.map(v => addHexPrefix(v))))

  finalCalldata.push(addHexPrefix(calldata.length.toString(16)))
  finalCalldata.push(...calldata)
  
  finalCalldata.push(addHexPrefix('0')) // Access list length

  finalCalldata.push(addHexPrefix(directives.length.toString(16)))
  finalCalldata.push(...directives.map(d => addHexPrefix(d.toString(16))))

  const targetFunctionName: string = asciiToHex(targetFunction.ethereumTypedName);
  const functionNameChunks: Array<string> = convertHexChunkIntoFeltArray(targetFunctionName);

  finalCalldata.push(addHexPrefix(functionNameChunks.length.toString(16)))
  finalCalldata.push(...functionNameChunks.map(n => addHexPrefix(n)))

  return finalCalldata
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prepareRosettanetCalldataEip2930() {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prepareRosettanetCalldataLegacy() {

}

export function prepareRosettanetCalldataForEstimatingFee(tx: EstimateFeeTransaction) : string[] {
  const { to, calldata, directives, value, targetFunction } = tx;

  if(calldata.length == 0 || directives.length == 0) {
    const finalCalldata: Array<string> = []

    finalCalldata.push(to)
    finalCalldata.push('0x0')
    finalCalldata.push('0x0')
    finalCalldata.push('0x0')
    finalCalldata.push('0x0')

    const value_u256 = safeUint256ToU256(value)
    finalCalldata.push(...(value_u256.map(v => addHexPrefix(v))))

    finalCalldata.push(addHexPrefix(calldata.length.toString(16)))
    finalCalldata.push(addHexPrefix('0')) // Access list length

    finalCalldata.push(addHexPrefix(directives.length.toString(16)))

    finalCalldata.push(addHexPrefix('0')) // Target function length
    return finalCalldata
  }

  if(typeof targetFunction === 'undefined') {
    throw 'Target function not empty but calldata and directives are empty'
  }

  const finalCalldata: Array<string> = []

  finalCalldata.push(to)
  finalCalldata.push('0x0')
  finalCalldata.push('0x0')
  finalCalldata.push('0x0')
  finalCalldata.push('0x0')

  const value_u256 = safeUint256ToU256(value)
  finalCalldata.push(...(value_u256.map(v => addHexPrefix(v))))

  finalCalldata.push(addHexPrefix(calldata.length.toString(16)))
  finalCalldata.push(...calldata)
  
  finalCalldata.push(addHexPrefix('0')) // Access list length

  finalCalldata.push(addHexPrefix(directives.length.toString(16)))
  finalCalldata.push(...directives.map(d => addHexPrefix(d.toString(16))))

  const targetFunctionName: string = asciiToHex(targetFunction.ethereumTypedName);
  const functionNameChunks: Array<string> = convertHexChunkIntoFeltArray(targetFunctionName);

  finalCalldata.push(addHexPrefix(functionNameChunks.length.toString(16)))
  finalCalldata.push(...functionNameChunks.map(n => addHexPrefix(n)))

  return finalCalldata
}

// First calldata element must be function selector
export function prepareRosettanetCalldata(
  signedTransaction: SignedRawTransaction,
  calldata: Array<string>,
  directives: Array<number>,
  targetFunction?: StarknetCallableMethod
): Array<string> | PrepareCalldataError  {
  if(signedTransaction.type == 2) {
    // Eip-1559
    const { to, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, value} = signedTransaction;
    if(maxPriorityFeePerGas == null || maxFeePerGas == null) {
      return <PrepareCalldataError> {
        message: 'maxPriorityFeePerGas or maxFeePerGas fields are null on Eip1559 transaction'
      }
    }
    return prepareRosettanetCalldataEip1559(to,nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, value, calldata,directives, targetFunction)
  } else {
    return <PrepareCalldataError> {
      message: 'Only Eip1559 transactions supported at the moment'
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
