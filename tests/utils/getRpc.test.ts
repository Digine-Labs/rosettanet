import {
  getConfigurationProperty,
  initConfig,
} from '../../src/utils/configReader'
import { getRpc } from '../../src/utils/getRpc'

describe('RPC Url unit test', () => {
  it('Returns testnet url', () => {
    initConfig()
    const rpcList = getConfigurationProperty('rpcUrls')
    const testRpc = getRpc()
    expect(rpcList.includes(testRpc))
  })
})
