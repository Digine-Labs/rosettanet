import { Signature, Transaction } from 'ethers'
import { RosettanetSignature } from '../types/types'
import { BnToU256, safeU256ToUint256, Uint256ToU256 } from './converters/integer'
import { addHexPadding, addHexPrefix } from './padding'
import { parseRosettanetRawCalldata } from './rosettanet'
import { getConfigurationProperty } from './configReader'

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

export function getEthersTransactionFromRosettanetCall(signature: string[], calldata: string[]): Transaction {
  const r = addHexPrefix(safeU256ToUint256([signature[0], signature[1]]));
  const s = addHexPrefix(safeU256ToUint256([signature[2], signature[3]]));
  const v =  Number(BigInt(signature[4]));

  const nonce = Number(BigInt(calldata[2]))
  const gasLimit = BigInt(calldata[6])
  const to = addHexPadding(calldata[1], 40, true);

  const value = addHexPrefix(safeU256ToUint256([calldata[7], calldata[8]]))
  const input = parseRosettanetRawCalldata(calldata);
  const data = typeof input === 'undefined' ? '0x' : input.rawInput
  const txType = calldata[0] as string
  const chainId = Number(BigInt(getConfigurationProperty('chainId')));
  if(txType === '0x0') {
    const gasPrice = BigInt(calldata[5])
    const signedTx = {
      chainId,
      signature : {
        v,r,s
      },
      nonce, gasPrice, gasLimit, value, to,
      type: 0,
      data
    }

    const txObject = Transaction.from(signedTx)
    return txObject;
  } else {
    const maxPriorityFeePerGas = BigInt(calldata[3])
    const maxFeePerGas = BigInt(calldata[4])
    const signedTx = {
      chainId,
      signature : {
        v,r,s
      },
      nonce, to, gasLimit, value,
      type: 2,
      data,
      maxFeePerGas, maxPriorityFeePerGas
    }
    const txObject = Transaction.from(signedTx)
    return txObject;
  }
}