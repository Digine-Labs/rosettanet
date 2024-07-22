import { writeLog } from './logger'
import { StartListening } from './server'
import { initConfig } from './utils/configReader'

initConfig()
StartListening()
writeLog(0, 'hello')
