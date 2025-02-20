import { ethCallHandler } from '../../../src/rpc/calls/ethCall'
import { RPCResponse } from '../../../src/types/types'

describe('Test Eth call request testnet', () => {
  it('Returns balance', async () => {
    // SN ADDR TO REQUEST BALANCE 0x0616E680F81d3b5Bc5CD68000CFfa77DF7A5592Cbb3fE1C65a14a84C195E4DBE
    // ETH VERSION 0xcffa77df7a5592cbb3fe1c65a14a84c195e4dbe

    // Account constantly has 0.1 eth
    const request = {
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [
        {
          from: '',
          to: '0xbec5832bd3f642d090891b4991da42fa4d5d9e2d',
          gas: '',
          gasPrice: '',
          value: '',
          data: '0x70a08231000000000000000000000000bc75b6c9f34232628bef76c6b74d6b78a99933b5', // balanceOf
        },
        'latest',
      ],
      id: 1,
    }
    // TODO: update test variables
    const result: RPCResponse = <RPCResponse>await ethCallHandler(request)
    
    // We have to make it more dynamic. this test has to read actual balance before running it.
    expect(result.result).toBe(
      '0x00000000000000000000000000000000000000000000002a1ea2b650b1605ba6',
    )
  }, 50000)

  it('Calls non parameter function', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [
        {
          from: '',
          to: '0xbec5832bd3f642d090891b4991da42fa4d5d9e2d',
          gas: '',
          gasPrice: '',
          value: '',
          data: '0x313ce567', // decimals
        },
        'latest',
      ],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await ethCallHandler(request)

    expect(result.result).toBe(
      '0x0000000000000000000000000000000000000000000000000000000000000012',
    )
  })
})
