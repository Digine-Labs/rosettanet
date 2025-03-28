/* eslint-disable @typescript-eslint/no-explicit-any */
import { Wallet, Transaction, AbiCoder } from 'ethers';

const PRIVATE_KEY = '0x72dd28749115344b785e66ec88f439471e10895693b6d659aaa8264f30272212'
const ETH_ADDRESS ='0x188669dbc25577B33d3eEFe1030bB7134bbaeC2A';

export function getTestAccount(): Wallet {
    const signer = new Wallet(PRIVATE_KEY);
  
    return signer;
}

export function getTestAccountAddress(): string {
    return ETH_ADDRESS;
}

export interface Eip1559Transaction {
    to: string,
    gasLimit: number,
    nonce: number,
    value: bigint,
    chainId: number,
    maxPriorityFeePerGas: number,
    maxFeePerGas: number
}

export interface SignedTransaction {
    txHash: string,
    signature: any,
    unsignedHash: string,
    signedSerialized: string
}

export async function eip1559Sign(tx: Eip1559Transaction, selector:string, abi: string[], params: any[]): Promise<SignedTransaction> {
    const testAccount = getTestAccount()

    const abicoder = new AbiCoder();

    const calldata = abicoder.encode(abi, params);
    const { to, gasLimit, nonce, value, chainId, maxPriorityFeePerGas, maxFeePerGas } = tx;
    const transaction = {
        to,
        gasLimit,
        nonce,
        value,
        chainId,
        accessList: [],
        maxPriorityFeePerGas,
        maxFeePerGas,
        data: `${selector}${calldata.replace('0x','')}`
      }

    const signedTx = Transaction.from(await testAccount.signTransaction(transaction));

    if(signedTx.hash == null) {
        throw 'Error at signing tx'
    }

    return {
        txHash: signedTx.hash,
        signature: signedTx.signature,
        unsignedHash: signedTx.unsignedHash,
        signedSerialized: signedTx.serialized
    }
}