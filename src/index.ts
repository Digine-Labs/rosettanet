import { syncBlockNumber } from './cache/blockNumber'
import { StartListening } from './server'
import { initConfig } from './utils/configReader'

initConfig()
syncBlockNumber()
StartListening()
