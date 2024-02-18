import { getRpc, mainnetRpc, testnetRpc } from '../../src/utils/getRpc'

describe('RPC Url unit test', () => {
  it('Returns testnet url', () => {
    const testRpc = getRpc('testnet')
    expect(testnetRpc.indexOf(testRpc)).toBeGreaterThan(-1)
  })

  it('Returns mainnet url', () => {
    const mainRpc = getRpc()
    expect(mainnetRpc.indexOf(mainRpc)).toBeGreaterThan(-1)
  })

  it('Returns mainnet url on wrong parameter', () => {
    const mainRpc = getRpc('abc')
    expect(mainnetRpc.indexOf(mainRpc)).toBeGreaterThan(-1)
  })
})
