import { Signature } from 'ethers'
import { RosettanetSignature } from '../types/types'
import { BnToU256, safeU256ToUint256, Uint256ToU256 } from './converters/integer'
import { addHexPrefix } from './padding'

export function createRosettanetSignature(
  evmSignature: Signature,
  value: bigint,
): RosettanetSignature {
  const arr: Array<string> = [
    ...Uint256ToU256(evmSignature.r.replace('0x', '')).map(rv =>
      addHexPrefix(rv),
    ),
    ...Uint256ToU256(evmSignature.s.replace('0x', '')).map(sv =>
      addHexPrefix(sv),
    ),
    addHexPrefix(evmSignature.v.toString(16)),
    ...BnToU256(value),
  ]
  return <RosettanetSignature>{
    v: evmSignature.v,
    r: evmSignature.r,
    s: evmSignature.s,
    value,
    arrayified: arr,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSignerFromRosettanetCall(signature: string[], calldata: string[]): any {
  const r = safeU256ToUint256([signature[0], signature[1]]);
  const s = safeU256ToUint256([signature[2], signature[3]]);
  const v =  Number(BigInt(signature[4]));

  const nonce = Number(BigInt(calldata[2]))
  const gasLimit = BigInt(calldata[6])
  const to = calldata[1];

  const value = safeU256ToUint256([calldata[7], calldata[8]])

  const txType = calldata[0] as string
  // Signer icin rosettanet.ts de parseRosettanetRawCalldata ile etherste signed tx i bir daha olusturulacak
  // ordan from adresini cekiceksin onu return edeceksin.
  // TODO: rosettanet.ts icinde decodeCalldataInput test yaz. calldata low high sirasi farklimi kontrol et.
  if(txType === '0x0') {
    const gasPrice = BigInt(calldata[5])
    const signedTx = {
      signature : {
        v,r,s
      },
      nonce, gasPrice, gasLimit, value, to,
      type: 0
    }
  } else {
    const maxPriorityFeePerGas = BigInt(calldata[3])
    const maxFeePerGas = BigInt(calldata[4])
    const signedTx = {
      signature : {
        v,r,s
      },
      nonce,
      type: 2
    }
  }
}