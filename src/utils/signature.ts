import { Signature } from "ethers";
import { RosettanetSignature } from "../types/types";
import { BnToU256, Uint256ToU256 } from "./converters/integer";
import { addHexPrefix } from "./padding";

export function createRosettanetSignature(evmSignature: Signature, value: bigint) : RosettanetSignature {
    const arr: Array<string> = [
        ...Uint256ToU256(evmSignature.r.replace('0x', '')).map(rv => addHexPrefix(rv)),
        ...Uint256ToU256(evmSignature.s.replace('0x', '')).map(sv => addHexPrefix(sv)),
        evmSignature.v.toString(16),
        ...BnToU256(value),
        ]
    return <RosettanetSignature> {
        v: evmSignature.v,
        r: evmSignature.r,
        s: evmSignature.s,
        value,
        arrayified: arr
    }
}