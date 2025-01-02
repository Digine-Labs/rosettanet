import { syncBlockNumber } from './cache/blockNumber'
import { writeLog } from './logger'
import { StartListening } from './server'
import { initConfig } from './utils/configReader'

initConfig()
syncBlockNumber()
StartListening()
