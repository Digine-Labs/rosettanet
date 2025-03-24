
import axios from "axios";
import { getDevAccount, SERVER } from "../utils";
import { registerContractIfNotRegistered } from "../registry/rosettanet";

const snAddress = "0x06419f7dea356b74bc1443bd1600ab3831b7808d1ef897789facfad11a172da7"
describe('eth_getBalance RPC method', () => {
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
    
    test.only("balance request in object format", async () => {
        const ethAddress = await registerContractIfNotRegistered(getDevAccount(), snAddress);
    
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: {
                address: ethAddress,
                blockParameter: "latest"
            },
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).toBe("0xd827dac033060ed89") // Correct balance
    }, 30000)
    
    test.only("balance request with wrong address", async () => {
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
    
    test.only("balance request with wrong address in object format", async () => {
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: {
                address: "0xABCDEFGHHJ", 
                blockParameter: "latest"
            },
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).toBeUndefined();
        expect(response.data.error).toBeDefined();
        expect(response.data.error.code).toBe(-32602);
        expect(response.data.error.message).toBe("Invalid argument, Parameter should be a valid Ethereum Address.");
    }, 30000)
    
    // Todo: specify error message
    test.only("balance request with missing address", async () => {
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [],
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).toBeUndefined();
        expect(response.data.error).toBeDefined();
        expect(response.data.error.code).toBe(-32602);
    }, 30000)
    
    test.only("balance request with missing address in object format", async () => {
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: {
                blockParameter: "latest"
            },
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).toBeUndefined();
        expect(response.data.error).toBeDefined();
        expect(response.data.error.code).toBe(-32602);
    }, 30000)
    
    test.only("balance request with empty object", async () => {
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: {},
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).toBeUndefined();
        expect(response.data.error).toBeDefined();
        expect(response.data.error.code).toBe(-32602);
    }, 30000)
    
    test.only("balance request with earliest block specifier", async () => {
        const ethAddress = await registerContractIfNotRegistered(getDevAccount(), snAddress);
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [ethAddress, "earliest"],
            id: 1,
        });
        expect(response.status).toBe(200);
        // Depending on your implementation, this might be 0 or some value
        expect(response.data.result).toBeDefined();
    }, 30000)
    
    test.only("balance request with pending block specifier", async () => {
        const ethAddress = await registerContractIfNotRegistered(getDevAccount(), snAddress);
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [ethAddress, "pending"],
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).toBeDefined();
    }, 30000)
    
    test.only("balance request with block number", async () => {
        const ethAddress = await registerContractIfNotRegistered(getDevAccount(), snAddress);
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [ethAddress, "0x1"], // Block 1
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).toBeDefined();
    }, 30000)
    
    test.only("balance request with non-existent block specifier", async () => {
        const ethAddress = await registerContractIfNotRegistered(getDevAccount(), snAddress);
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [ethAddress, "wrongblock"],
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).toBeUndefined();
        expect(response.data.error).toBeDefined();
        // If you implement block validation:
        // expect(response.data.error.code).toBe(-32602);
        // expect(response.data.error.message).toContain("Invalid block parameter");
    }, 30000)
    
    test.only("balance request with null params", async () => {
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: null,
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.error).toBeDefined();
        expect(response.data.error.code).toBe(-32602);
    }, 30000)
    
    test.only("balance request with malformed object", async () => {
        const ethAddress = await registerContractIfNotRegistered(getDevAccount(), snAddress);
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: { wrongKey: ethAddress },
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.error).toBeDefined();
        expect(response.data.error.code).toBe(-32602);
    }, 30000)
    
});
