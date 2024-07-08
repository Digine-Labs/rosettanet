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
          to: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          gas: '',
          gasPrice: '',
          value: '',
          data: '0x70a082310000000000000000000000000cffa77df7a5592cbb3fe1c65a14a84c195e4dbe', // balanceOf
        },
        'latest',
      ],
      id: 1,
    }
    // TODO: update test variables
    const result: RPCResponse = <RPCResponse>await ethCallHandler(request)
    expect(result.result).toBe(
      '0x000000000000000000000000000000000000000000000000016345785d8a0000',
    )
    
  })

  it('Calls non parameter function', async() => {
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
