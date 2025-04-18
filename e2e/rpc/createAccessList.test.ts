import axios from 'axios'
import { SERVER } from '../utils'
describe('eth_createAccessList RPC method', () => {
    test.only('Should return empty array since access list is not supported with Rosettanet', async () => {
        const response = await axios.post(SERVER, {
            jsonrpc: '2.0',
            method: 'eth_createAccessList',
            params: [],
            id: 1,
        })
        
        expect(response.status).toBe(200)
        expect(response.data.result).toBeDefined()
        expect(response.data.result).toStrictEqual({accessList: []})
        expect(response.data.jsonrpc).toBe('2.0')
        expect(response.data.id).toBe(1)
    }, 30000)
})