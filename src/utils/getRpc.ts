import { getConfigurationProperty } from './configReader'

export const getRpc = (): string => {
  const rpcList = getConfigurationProperty('rpcUrls')
  const rpc = rpcList[Math.floor(Math.random() * rpcList.length)]
  return rpc
}
