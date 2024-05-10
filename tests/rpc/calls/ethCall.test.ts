import { ethCallHandler } from '../../../src/rpc/calls/ethCall'
import { RPCResponse } from '../../../src/types/types'

describe('Test Eth call request testnet', () => {
  it('Returns balance', async () => {
    // SN ADDR TO REQUEST BALANCE 0x061D2D0E093B92116632A5068Ce683d051E2Ada4ACddf948bA77ec2Fed9786d6
    // ETH VERSION 0x8ce683d051e2ada4acddf948ba77ec2fed9786d6
    const request = {
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [
        {
          from: '',
          to: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          gas: '',
          gasPrice: '',
          value: '',
          data: '0x70a08231000000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7', // balanceOf
        },
        'latest',
      ],
      id: 1,
    }
    // TODO: update test variables
    const result: RPCResponse = <RPCResponse>await ethCallHandler(request)
    expect(typeof result !== 'undefined').toBe(true) // remove this test
  })
})
