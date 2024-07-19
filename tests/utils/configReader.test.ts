import { readConfig } from '../../src/utils/configReader'

describe('Config file check', () => {
  it('returning AppName in config', () => {
    const config = readConfig()
    expect(config.appName).toBe('RosettaNet')
  })
})
