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
