import {
  initConfig,
  getConfigurationProperty,
} from '../../src/utils/configReader'
import path from 'path'

describe('Config file check', () => {
  it('returning AppName in config', () => {
    initConfig(path.resolve(__dirname, '../../config.json'))
    expect(getConfigurationProperty('appName')).toBe('RosettaNet')
  })

  it('Error with missing prop', () => {
    expect(() => {
      getConfigurationProperty('asd')
    }).toThrow('Property asd not found in configuration')
  })

  it('Returns an element from Array', () => {
    expect(getConfigurationProperty('rpcUrls')[0]).toBe(
      'https://starknet-sepolia.public.blastapi.io',
    )
  })
})
