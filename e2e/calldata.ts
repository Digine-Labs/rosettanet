/* eslint-disable @typescript-eslint/no-explicit-any */
import { Interface } from "ethers";


export function encodeCalldata(funcSignature: string, args: any) {
    const iface = new Interface([`function ${funcSignature}`]);
    const functionName = funcSignature.split('(')[0]; // "balanceOf" gibi
    const callData = iface.encodeFunctionData(functionName, args);
    return callData;
}