import { AccessList } from 'ethers'

export interface EthereumSignature {
  v: number
  r: string
  s: string
  networkV?: string
}

export interface EthereumTransaction {
  chainId?: string
  type?: string
  hash?: string
  nonce?: number
  gasLimit?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
  from?: string
  to?: string
  publicKey?: string
  data: string
  value?: string
  signature: EthereumSignature
  accessList?: AccessList
}

export interface StarknetInvokeTransaction {
  account_deployment_data: Array<string>
  calldata: Array<string>
  chain_id: string
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
