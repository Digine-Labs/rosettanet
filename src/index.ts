import { deployRosettaContracts } from '../e2e/deployRosettaContracts'
import { syncBlockNumber } from './cache/blockNumber'
import { syncGasPrice } from './cache/gasPrice'
import { StartListening } from './server'
import { initConfig } from './utils/configReader'

function isDevnet(): boolean {
  console.log(process.argv.slice(2).indexOf('--devnet') > -1)
  return process.argv.slice(2).indexOf('--devnet') > -1
}

initConfig(isDevnet())
if (isDevnet()) {
  deployRosettaContracts()
}
syncBlockNumber()
syncGasPrice()
StartListening()
