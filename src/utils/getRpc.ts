import { getConfigurationProperty, initConfig } from './configReader'

initConfig()
const rpcList = getConfigurationProperty('rpcUrls')

export const getRpc = (): string => {
  const rpc = rpcList[Math.floor(Math.random() * rpcList.length)]
  return rpc
}
