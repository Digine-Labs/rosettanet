import {
  getConfigurationProperty,
  initConfig,
} from '../../src/utils/configReader'
import { getRpc } from '../../src/utils/getRpc'
import path from 'path'

describe('RPC Url unit test', () => {
  it('Returns testnet url', async () => {
    await initConfig(path.resolve(__dirname, '../../config.json'))
    const rpcList = getConfigurationProperty('rpcUrls')
    const testRpc = getRpc()
    expect(rpcList.includes(testRpc)).toBeTruthy()
  })
})
