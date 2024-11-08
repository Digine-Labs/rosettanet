import { StarknetInvokeTransaction } from '../types/transactions.types'

// Signature will be v,r,s
export function prepareStarknetInvokeTransaction(/* ethTx: EthereumTransaction */) {
  const starknetTx: StarknetInvokeTransaction = {
    calldata: [],
    chain_id: 'TODO',
    fee_data_availability_mode: 'L1',
    nonce: 'TODO',
    nonce_data_availability_mode: 'L1',
    paymaster_data: [],
    account_deployment_data: [],
    resource_bounds: {
      // Copied from https://docs.infura.io/api/networks/starknet/json-rpc-methods/starknet_addinvoketransaction
      l1_gas: '0x28ed6103d0000',
      l2_gas: '0x28ed6103d0000',
    },
    sender_address: 'TODO',
    signature: [],
    tip: '0x0',
    version: '0x3',
    type: 'INVOKE',
  }

  return starknetTx
}
