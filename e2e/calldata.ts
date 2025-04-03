/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbiCoder, id, Interface } from "ethers";

export function prepareCalldata(fn: string, inputs: any[]): string {
    const abicoder = new AbiCoder();

    const calldata = abicoder.encode([fn],[inputs])
    const selector = id(fn).slice(0, 10);

    return `${selector}${calldata}`
}

export function encodeCalldata(funcSignature: string, args: any) {
    const iface = new Interface([`function ${funcSignature}`]);
    const functionName = funcSignature.split('(')[0]; // "balanceOf" gibi
    const callData = iface.encodeFunctionData(functionName, args);
    return callData;
}