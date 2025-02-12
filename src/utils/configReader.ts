import * as fs from 'fs'
import * as path from 'path'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let configuration: any

export function getConfiguration(): object | undefined {
  if (typeof configuration === 'undefined') {
    throw new Error('Config not initialized')
  }

  return configuration
}

export function isConfigurationInitialized(): boolean {
  if (typeof configuration === 'undefined') {
    return false
  }
  return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getConfigurationProperty(prop: string): any {
  if (!isConfigurationInitialized()) {
    throw new Error('Config not initialized')
  }

  // eslint-disable-next-line no-prototype-builtins
  if (!configuration.hasOwnProperty(prop)) {
    throw new Error(`Property ${prop} not found in configuration`)
  }

  return configuration[prop]
}

export function initConfig(isDevnet: boolean) {
  const configPath = path.resolve(__dirname, '../../config.json')

  // Check if the config file exists
  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found at path: ${configPath}`)
  }

  // Check if the file is a JSON file
  if (path.extname(configPath) !== '.json') {
    throw new Error(`Configuration file is not a JSON file: ${configPath}`)
  }

  // Check if the file has read access
  try {
    fs.accessSync(configPath, fs.constants.R_OK)
  } catch (error) {
    throw new Error(`Configuration file is not readable: ${configPath}`)
  }

  const rawData = fs.readFileSync(configPath, 'utf8')

  // Try to parse the JSON file
  let config
  try {
    config = JSON.parse(rawData)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error parsing JSON configuration file: ${error.message}`)
  }

  // Check if the required properties exist and have the correct types
  if (typeof config.appName !== 'string') {
    throw new Error(
      `Invalid or missing 'appName' in configuration file: ${configPath}`,
    )
  }
  if (typeof config.port !== 'number') {
    throw new Error(
      `Invalid or missing 'port' in configuration file: ${configPath}`,
    )
  }

  if (isDevnet) {
    config.accountClass =
      '0xc050554bb686f9c5e6a9557a372fcc0d6e9a9cc15b3d080bd37b15ff67af17'
    config.rosettanet =
      '0x37a66400579d7a1bbeec478d4b189b25e486a59b5f9ad1e4d5aa89b9bf9b002'
    config.rpcUrls = ['http://127.0.0.1:5050']
    config.ethAddress =
      '0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7'
    config.strkAddress =
      '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d'
    config.predeployedUDC =
      '0x41A78E741E5AF2FEC34B695679BC6891742439F7AFB8484ECD7766661AD02BF'
    config.account1 = {
      address:
        '0x064b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
      privateKey:
        '0x0000000000000000000000000000000071d7bb07b9a64f6f78ac4c816aff4da9',
      publicKey:
        '0x039d9e6ce352ad4530a0ef5d5a18fd3303c3606a7fa6ac5b620020ad681cc33b',
    }
    config.account2 = {
      address:
        '0x078662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1',
      privateKey:
        '0x000000000000000000000000000000000e1406455b7d66b1690803be066cbe5e',
      publicKey:
        '0x007a1bb2744a7dd29bffd44341dbd78008adb4bc11733601e7eddff322ada9cb',
    }
    config.account3 = {
      address:
        '0x049dfb8ce986e21d354ac93ea65e6a11f639c1934ea253e5ff14ca62eca0f38e',
      privateKey:
        '0x00000000000000000000000000000000a20a02f0ac53692d144b20cb371a60d7',
      publicKey:
        '0x00b8fd4ddd415902d96f61b7ad201022d495997c2dff8eb9e0eb86253e30fabc',
    }
    config.account4 = {
      address:
        '0x04f348398f859a55a0c80b1446c5fdc37edb3a8478a32f10764659fc241027d3',
      privateKey:
        '0x00000000000000000000000000000000a641611c17d4d92bd0790074e34beeb7',
      publicKey:
        '0x05e05d2510c6110bde03df9c1c126a1f592207d78cd9e481ac98540d5336d23c',
    }
    config.account5 = {
      address:
        '0x00d513de92c16aa42418cf7e5b60f8022dbee1b4dfd81bcf03ebee079cfb5cb5',
      privateKey:
        '0x000000000000000000000000000000005b4ac23628a5749277bcabbf4726b025',
      publicKey:
        '0x04708e28e2424381659ea6b7dded2b3aff4b99debfcf6080160a9d098ac2214d',
    }

    configuration = config
  } else {
    configuration = config
  }
}

// Adds a new key-value pair to the configuration object
export function addConfigurationElement(key: string, value: unknown): void {
  if (!isConfigurationInitialized()) {
    throw new Error('Config not initialized')
  }

  if (typeof key !== 'string' || key.trim() === '') {
    throw new Error('Invalid key for configuration element')
  }

  configuration[key] = value
}
