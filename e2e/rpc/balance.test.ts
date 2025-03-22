
import axios from "axios";
import { getDevAccount, SERVER } from "../utils";
import { registerContractIfNotRegistered } from "../registry/rosettanet";

const snAddress = "0x06419f7dea356b74bc1443bd1600ab3831b7808d1ef897789facfad11a172da7"

test.only("balance request in array", async () => {
    const ethAddress = await registerContractIfNotRegistered(getDevAccount(),snAddress);

    const response = await axios.post(SERVER, {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [ethAddress, "latest"],
        id: 1,
    });
    expect(response.status).toBe(200);
    expect(response.data.result).toBe("0xd827dac033060ed89") // Todo: Correct balance
}, 30000)

test.only("balance request wrong address", async () => {
    const response = await axios.post(SERVER, {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: ["0xABCDEFGHHJ", "latest"],
        id: 1,
    });
    expect(response.status).toBe(200);
    expect(response.data.result).toBeUndefined();
    expect(response.data.error).toBeDefined();
    expect(response.data.error.code).toBe(-32602);
    expect(response.data.error.message).toBe("Invalid argument, Parameter should be a valid Ethereum Address.");
}, 30000)

test.only("balance request future block", async () => {
    // TODO: add block check for eth_getBalance on RPC
    const ethAddress = await registerContractIfNotRegistered(getDevAccount(),snAddress);
    const response = await axios.post(SERVER, {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [ethAddress, "latest"],
        id: 1,
    });
    expect(response.status).toBe(200);
    expect(response.data.result).toBeUndefined();
    expect(response.data.error).toBeDefined();
    expect(response.data.error.code).toBe(-32602);
    expect(response.data.error.message).toBe("Invalid argument, Parameter should be a valid Ethereum Address.");
}, 30000)

test.only("balance request non-exist block specifier", async () => {
    // TODO: add block check for eth_getBalance on RPC
    const ethAddress = await registerContractIfNotRegistered(getDevAccount(),snAddress);
    const response = await axios.post(SERVER, {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [ethAddress, "wrongblock"],
        id: 1,
    });
    expect(response.status).toBe(200);
    expect(response.data.result).toBeUndefined();
    expect(response.data.error).toBeDefined();
    expect(response.data.error.code).toBe(-32602);
    expect(response.data.error.message).toBe("Invalid argument, Parameter should be a valid Ethereum Address.");
}, 30000)

test.only("balance request in object", async () => {
    // Todo: Object olarak request atma get_balance fonksiyonun da var mi? Varsa bu testside duzeltmeliyiz.
    const ethAddress = await registerContractIfNotRegistered(getDevAccount(),snAddress);

    const response = await axios.post(SERVER, {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [ethAddress, "latest"],
        id: 1,
    });
    expect(response.status).toBe(200);
    expect(response.data.result).toBe("0xd827dac033060ed89") // Todo: Correct balance
}, 30000)