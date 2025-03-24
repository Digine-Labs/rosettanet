import { initConfig } from '../src/utils/configReader'
import path from 'path'

// Initialize config with test configuration file
beforeAll(async () => {
  try {
    await initConfig(path.resolve(__dirname, '../config.json'))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error initializing config:', error)
  }
})
