import config from '../../src/utils/configReader'

describe('Config file check', () => {
  it('returning AppName in config', () => {
    expect(config.appName).toBe('RosettaNet')
  })
})
