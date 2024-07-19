import * as fs from 'fs'
import * as path from 'path'

interface Config {
  appName: string
  port: number
}

export function readConfig(): Config {
  const configPath = path.resolve(__dirname, '../../config.json')
  const rawData = fs.readFileSync(configPath, 'utf8')
  const config: Config = JSON.parse(rawData)
  return config
}

// böyle çağırırız
// const config = readConfig()
