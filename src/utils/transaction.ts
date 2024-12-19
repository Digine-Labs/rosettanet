import { StarknetInvokeTransaction } from '../types/transactions.types'
import { BnToU256, Uint256ToU256 } from './converters/integer'
import { addHexPrefix } from './padding'

// Signature will be v,r,s
// Deprecate this one
export function prepareStarknetInvokeTransaction(
  caller: string,
  calldata: Array<string>,
  signature: Array<string>,
  chainId: string,
  nonce: string,
) {
  const starknetTx: StarknetInvokeTransaction = {
    invoke_transaction: {
      calldata: calldata,
      fee_data_availability_mode: 'L1',
      nonce: nonce,
      nonce_data_availability_mode: 'L1',
      paymaster_data: [],
      account_deployment_data: [],
      resource_bounds: {
        l1_gas: {
            max_amount: "0x100",
            max_price_per_unit: "44963204502270"
        },
        l2_gas: {
            max_amount: "0x0",
            max_price_per_unit: "0x0"
        }
    },
      sender_address: caller,
      signature: signature,
      tip: '0x0',
      version: '0x3',
      type: 'INVOKE',
    },
  }

  return starknetTx
}

// First calldata element must be function selector
export function prepareRosettanetCalldata(
  to: string,
  nonce: string,
  max_priority_fee_per_gas: string,
  max_fee_per_gas: string,
  gas_limit: string,
  value: string,
  calldata: Array<string>,
  directives: Array<number>,
): Array<string> {
  // TODO add final validations for parameters

  if (calldata.length -1 != directives.length) {
    throw `Directive and calldata array sanity fails`
  }
  
  const finalCalldata: Array<string> = []

  finalCalldata.push(to)
  finalCalldata.push('0x' + nonce)
  finalCalldata.push(max_priority_fee_per_gas)
  finalCalldata.push(max_fee_per_gas)
  finalCalldata.push(gas_limit)

  const value_u256 = Uint256ToU256(value)
  finalCalldata.push(...value_u256)

  finalCalldata.push(calldata.length.toString())
  finalCalldata.push(...calldata)

  finalCalldata.push(directives.length.toString())
  finalCalldata.push(...directives.map(d => d.toString()))

  return finalCalldata
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
