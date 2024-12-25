import * as ethers from 'ethers'
import {
  EthereumSignature,
  EthereumTransaction,
} from '../types/transactions.types'

// Legacy -> No type 0x0
//    (nonce, gasprice, startgas, to, value, data, chainid, 0, 0)
// EIP2930 -> 0X1
//    0x01 || rlp([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, signatureYParity, signatureR, signatureS])
// EIP1559 -> 0X2
//    0x02 || rlp([chain_id, nonce, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, destination, amount, data, access_list, signature_y_parity, signature_r, signature_s])

export function decodeSignedRawTransaction(tx: string): EthereumTransaction {
  // 1) Check is tx valid
  // 2) Find transaction type (legacy, eip1559 or any other supported)
  // 3) return object
  const decoded = ethers.Transaction.from(tx)

  if (
    typeof decoded.nonce !== 'number' ||
    typeof decoded.chainId === 'undefined' ||
    typeof decoded.to !== 'string' ||
    (typeof decoded.gasPrice === 'undefined' &&
      typeof decoded.maxFeePerGas === 'undefined') ||
    typeof decoded.gasLimit === 'undefined' ||
    typeof decoded.value === 'undefined' ||
    typeof decoded.data !== 'string'
  ) {
    throw 'transaction type wrong'
  }

  // All supported type of transactions must have: (nonce, chainid, to, (gasPrice or max fee per gas), gaslimit?, value, data)
  // First check all properties without signature
  if (
    typeof decoded.typeName !== 'string' ||
    typeof decoded.hash !== 'string'
  ) {
    throw 'hash or typeName non-exist'
  }

  if (
    typeof decoded.from !== 'string' ||
    typeof decoded.fromPublicKey !== 'string'
  ) {
    // This means tx is not signed
    throw 'from or fromPublicKey non-exist'
  }

  if (typeof decoded.to !== 'string') {
    // This means init tx
    throw 'init transaction not supported'
  }

  if (!decoded.isSigned()) {
    // Return if non signed tx
    throw 'tx not signed'
  }

  // TODO check signature is correct

  const signature: EthereumSignature = {
    v: decoded.signature.v,
    /* 
            Please keep in mind that v, depending on the context depends on the chain ID and in the future may further be hijacked (e.g. EIP 186) 
            to have additional meanings. The recoveryParam is either 0 or 1. 
            The value you need to pass into ecrecover in solidity is (27 + recoveryParam), 
            which is the same as the unspecified network (i.e. chain ID 0). 
            For other chain ID, v is ((35 + 2 * chainID) + recoveryParam).
    */
    r: decoded.signature.r,
    s: decoded.signature.s,
    networkV: decoded.signature.networkV?.toString(),
  }

  const transaction: EthereumTransaction = {
    chainId: decoded.chainId.toString(),
    type: decoded.typeName,
    hash: decoded.hash,
    nonce: decoded.nonce,
    gasLimit: decoded.gasLimit.toString(),
    maxFeePerGas: decoded.maxFeePerGas?.toString(), // TODO: this is not exist on legacy
    maxPriorityFeePerGas: decoded.maxPriorityFeePerGas?.toString(), // TODO: this is not exist on legacy
    from: decoded.from,
    to: decoded.to,
    publicKey: decoded.fromPublicKey,
    data: decoded.data,
    signature: signature,
    accessList: decoded.accessList ? decoded.accessList : [], // TODO: is that correct?
  }

  return transaction
}

export function asciiToHex(str: string): string {
      const arr1 = [];
      for (let n = 0, l = str.length; n < l; n++) {
          const hex = Number(str.charCodeAt(n)).toString(16);
          arr1.push(hex);
      }
      return arr1.join('');
}