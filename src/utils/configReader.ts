/* eslint-disable  @typescript-eslint/no-explicit-any */
import { promises as fs } from 'fs'
import * as path from 'path'

let configuration: any

export function isConfigurationInitialized(): boolean {
  if (typeof configuration === 'undefined') {
    return false
  }
  return true
}

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

export async function initConfig(configPath: string): Promise<boolean> {
  // Check if the file is a JSON file
  if (path.extname(configPath) !== '.json') {
    throw new Error(`Configuration file is not a JSON file: ${configPath}`)
  }

  // Check if the file has read access
  try {
    await fs.access(configPath, fs.constants.R_OK)
  } catch (error) {
    throw new Error(`Configuration file is not readable: ${configPath}, ${error}`)
  }

  const rawData = await fs.readFile(configPath, 'utf8')

  // Try to parse the JSON file
  let config
  try {
    config = JSON.parse(rawData)
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

  configuration = config
  return true
}
