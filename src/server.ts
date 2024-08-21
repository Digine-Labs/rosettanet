import express, { Application } from 'express'
import { parseRequest } from './utils/parser'
import { callStarknet } from './utils/callHelper'

import Routes from './rpc/calls'
import { RPCResponse } from './types/types'

export function StartListening() {
  const app: Application = express()
  const port = process.env.PORT || 3000

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(parseRequest)
  app.use('/', Routes)

  app.listen(port, (): void => {})
}

// Resolves starknet chain id
// TODO: use it while initializing server. Create state that holds which network we are working with.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function resolveNetwork(): Promise<string> {
  const response: RPCResponse | string = await callStarknet({
    jsonrpc: '2.0',
    id: 0,
    method: 'starknet_chainId',
    params: [],
  })

  if (
    typeof response === 'string' ||
    response === null ||
    typeof response === 'undefined' ||
    response.result ||
    typeof response.result !== 'string'
  ) {
    throw new Error('Chain ID resolve failed')
  }

  return response.result
}
