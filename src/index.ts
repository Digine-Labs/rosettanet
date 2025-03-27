import { initialSyncBlockNumber, syncBlockNumber } from './cache/blockNumber'
import { initialSyncGasPrice, syncGasPrice } from './cache/gasPrice'
import { StartListening } from './server'
import { initConfig } from './utils/configReader'

export async function initNode(configFile: string) {
  await initConfig(configFile)
  await initialSyncBlockNumber()
  await initialSyncGasPrice()
  syncBlockNumber()
  syncGasPrice()
  StartListening()
}

if (require.main === module) {
  initNode('config.json')
}
