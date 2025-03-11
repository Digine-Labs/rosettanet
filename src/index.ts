import { syncBlockNumber } from './cache/blockNumber'
import { syncGasPrice } from './cache/gasPrice'
import { StartListening } from './server'
import { initConfig } from './utils/configReader'

export async function initNode(configFile: string) {
    await initConfig(configFile)
    syncBlockNumber()
    syncGasPrice()
    StartListening()
}

if (require.main === module) {
    initNode("config.json")
}