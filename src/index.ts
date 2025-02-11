import { deployRosettaContracts } from '../e2e/deployRosettaContracts'
import { syncBlockNumber } from './cache/blockNumber'
import { syncGasPrice } from './cache/gasPrice'
import { StartListening } from './server'
import { initConfig } from './utils/configReader'

function isDevnet(): boolean {
  return process.argv.slice(2).indexOf('--devnet') > -1
}

async function Start() {
  initConfig(isDevnet())
  if (isDevnet()) {
    await deployRosettaContracts()
  }
  syncBlockNumber()
  syncGasPrice()
  StartListening()
}

Start()
