import { ResourceBounds } from "./types"

export interface EthereumSignature {
  v: number
  r: string
  s: string
  networkV?: string
}

export interface StarknetInvokeTransaction {
  invoke_transaction: {
    account_deployment_data: Array<string>
    calldata: Array<string>
    fee_data_availability_mode: string
    nonce: string
    nonce_data_availability_mode: string
    paymaster_data: Array<string>
    resource_bounds?: ResourceBounds
    sender_address: string
    signature: Array<string>
    tip: string
    version: string
    type?: string
  }
}
