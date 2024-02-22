import { maxPriorityFeePerGasHandler } from '../../../src/rpc/calls/maxPriorityFeePerGas'
import { RPCResponse } from '../../../src/types/types'

describe('Test Max fee priority fee request', () => {
  it('Returns 0x0', async () => {
    const result: RPCResponse = <RPCResponse>await maxPriorityFeePerGasHandler()

    expect(result.result).toBe('0x0')
  })
})
