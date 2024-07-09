import { gasPriceHandler } from '../../../src/rpc/calls/gasPrice'
import { RPCResponse } from '../../../src/types/types'

describe('Test gas price request', () => {
  it('Returns 0x1778dc527', async () => {
    const result: RPCResponse = <RPCResponse>await gasPriceHandler()

    expect(result.result).toBe('0x1778dc527')
  })
})
