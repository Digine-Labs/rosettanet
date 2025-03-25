import axios from 'axios'
import { forkBlock, SERVER } from '../utils'

test.only('Get block number', async () => {
  const response = await axios.post(SERVER, {
    jsonrpc: '2.0',
    method: 'eth_blockNumber',
    params: [],
    id: 1,
  })
  expect(response.status).toBe(200)
  expect(response.data.result).not.toBeUndefined()
  // Since we do transactions during tests. Block number increased in each tx. so we can just check that block number is higher than fork block
  expect(BigInt(response.data.result) > BigInt(forkBlock)).toBe(true)
}, 30000)
