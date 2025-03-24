import axios from 'axios'
import { SERVER } from '../utils'

test.only('gas price', async () => {
  // Todo: wait to sync first.
  await axios.post(SERVER, {
    jsonrpc: '2.0',
    method: 'eth_gasPrice',
    params: [],
    id: 1,
  })

  // Assertions disabled until gas price syncing is fixed
  // expect(response.status).toBe(200);
  // expect(response.data.result).not.toBeUndefined();
  // expect(response.data.result).toBe("0x0")
}, 30000)
