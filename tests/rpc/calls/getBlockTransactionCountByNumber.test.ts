import { getBlockTransactionCountByNumberHandler } from "../../../src/rpc/calls/getBlockTransactionCountByNumber";
import { RPCResponse } from "../../../src/types/types";


describe('Test getBlockTransactionCountByNumber request testnet', () => {
    it('Returns block transaction count', async () => {
            const request = {
            jsonrpc: '2.0',
            method: 'eth_getBlockTransactionCountByNumber',
            params: ['0x0'],
            id: 1,
            }
            const result: RPCResponse = <RPCResponse>await getBlockTransactionCountByNumberHandler(request)
            expect(result.result).toBe('0x1a')
        })
    }
)