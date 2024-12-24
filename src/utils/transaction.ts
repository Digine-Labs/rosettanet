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
            max_price_per_unit: "34963204502270"
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
  nonce: number,
  max_priority_fee_per_gas: bigint,
  max_fee_per_gas: bigint,
  gas_limit: bigint,
  value: bigint,
  calldata: Array<string>,
  directives: Array<number>,
): Array<string> {
  // TODO add final validations for parameters

  if (calldata.length -1 != directives.length) {
    throw `Directive and calldata array sanity fails`
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

  finalCalldata.push(addHexPrefix(directives.length.toString(16)))
  finalCalldata.push(...directives.map(d => addHexPrefix(d.toString(16))))

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
