import { getBlockTransactionCountByNumberHandler } from "../../../src/rpc/calls/getBlockTransactionCountByNumber";
import { RPCResponse } from "../../../src/types/types";


describe('Test getBlockTransactionCountByNumber request testnet', () => {
    it('Returns block transaction count', async () => {
            const request = {
            jsonrpc: '2.0',
            method: 'eth_getBlockTransactionCountByNumber',
            params: [0],
            id: 1,
            }
            const response: RPCResponse = <RPCResponse>await getBlockTransactionCountByNumberHandler(request)
            expect(typeof response.result).toBe('string')
            expect(response.result).toBe('0x1a')
        }),
    it('Returns block transaction count', async () => {
            const request = {
            jsonrpc: '2.0',
            method: 'eth_getBlockTransactionCountByNumber',
            params: [1],
            id: 1,
            }
            const response: RPCResponse = <RPCResponse>await getBlockTransactionCountByNumberHandler(request)
            expect(typeof response.result).toBe('string')
            expect(response.result).toBe('0x4')
    })
})