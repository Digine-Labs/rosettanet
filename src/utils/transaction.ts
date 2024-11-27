import { StarknetInvokeTransaction } from '../types/transactions.types'
import { Uint256ToU256 } from './converters/integer'

// Signature will be v,r,s
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
      chain_id: chainId,
      fee_data_availability_mode: 'L1',
      nonce: nonce,
      nonce_data_availability_mode: 'L1',
      paymaster_data: [],
      account_deployment_data: [],
      resource_bounds: {
        // Copied from https://docs.infura.io/api/networks/starknet/json-rpc-methods/starknet_addinvoketransaction
        l1_gas: '0x28ed6103d0000',
        l2_gas: '0x28ed6103d0000',
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
  directives: Array<boolean>,
): Array<string> {
  // TODO add final validations for parameters

  if (calldata.length != directives.length) {
    throw `Directive and calldata array sanity fails`
  }

  if (directives.length != 0 && directives[0]) {
    throw `First directive must be false`
  }
  const finalCalldata: Array<string> = []

  finalCalldata.push(to)
  finalCalldata.push(nonce)
  finalCalldata.push(max_priority_fee_per_gas)
  finalCalldata.push(max_fee_per_gas)
  finalCalldata.push(gas_limit)

  const value_u256 = Uint256ToU256(value)
  finalCalldata.push(...value_u256)

  finalCalldata.push(calldata.length.toString())
  finalCalldata.push(...calldata)

  finalCalldata.push(directives.length.toString())
  finalCalldata.push(...directives.map(d => (d ? `1` : `0`)))

  return finalCalldata
}
