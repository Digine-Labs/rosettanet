import axios from 'axios'
import { SERVER } from '../utils'
describe('eth_blobBaseFee RPC method', () => {
    test.only('Should return 0x42', async () => {
        const response = await axios.post(SERVER, {
            jsonrpc: '2.0',
            method: 'eth_blobBaseFee',
            params: [],
            id: 1,
        })
        
        expect(response.status).toBe(200)
        expect(response.data.result).toBeDefined()
        expect(response.data.result).toBe("0x42")
        expect(response.data.jsonrpc).toBe('2.0')
        expect(response.data.id).toBe(1)
    }, 30000)
    test.only('Should return 0x42 multiple times', async () => {
        const response = await axios.post(SERVER, [{
            jsonrpc: '2.0',
            method: 'eth_blobBaseFee',
            params: [],
            id: 1,
        },{
            jsonrpc: '2.0',
            method: 'eth_blobBaseFee',
            params: [],
            id: 2,
        }])
        
        expect(response.status).toBe(200)
        expect(response.data.length).toBe(2)
        expect(response.data[0].result).toStrictEqual("0x42")
        expect(response.data[1].result).toStrictEqual("0x42")
    }, 30000)
})