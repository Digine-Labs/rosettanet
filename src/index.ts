import { syncBlockNumber } from './cache/blockNumber'
import { syncGasPrice } from './cache/gasPrice'
import { StartListening } from './server'
import { initConfig } from './utils/configReader'

initConfig()
syncBlockNumber()
syncGasPrice()
StartListening()
