import { AccountDeployError, AccountDeployResult } from "../utils/rosettanet";
import { RPCError, RPCResponse } from "./types";

export function isRPCError(value: unknown): value is RPCError {
    if (typeof value === "object" && value !== null) {
        const obj = value as RPCError;
        return typeof obj.id === "number" && typeof obj.jsonrpc === "string"  && typeof obj.error === "object"  && obj.error !== null && typeof obj.error.code === 'number' && typeof obj.error.message === 'string';
    }
    return false;
}

export function isRPCResponse(value: unknown): value is RPCResponse {
    if (typeof value === "object" && value !== null) {
        const obj = value as RPCResponse;
        return typeof obj.id === "number" && typeof obj.jsonrpc === "string"  && obj.result !== null;
    }
    return false;
}

export function isAccountDeployError(value: unknown): value is AccountDeployError {
    if (typeof value === "object" && value !== null) {
      const obj = value as AccountDeployError;
      return typeof obj.code === "number" && typeof obj.message === "string";
    }
    return false;
  }
  
export function isAccountDeployResult(value: unknown): value is AccountDeployResult {
    if (typeof value === "object" && value !== null) {
        const obj = value as AccountDeployResult;
        return typeof obj.transactionHash === "string" && typeof obj.contractAddress === "string";
    }
    return false;
}