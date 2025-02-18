import { getConfigurationProperty, initConfig } from './configReader'

function isDevnet(): boolean {
  return process.argv.slice(2).indexOf('--devnet') > -1
}

initConfig(isDevnet())
const rpcList = getConfigurationProperty('rpcUrls')

export const getRpc = (): string => {
  const rpc = rpcList[Math.floor(Math.random() * rpcList.length)]
  return rpc
}
