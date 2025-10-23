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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resource_bounds?: any
    sender_address: string
    signature: Array<string>
    tip: string
    version: string
    type?: string
  }
}
