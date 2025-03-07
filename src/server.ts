import express, { Application } from 'express'
import { parseRequest } from './utils/parser'
import cors from 'cors';

import Routes from './rpc/calls'
import { getConfigurationProperty } from './utils/configReader'

export function StartListening() {
  const app: Application = express()
  const host = getConfigurationProperty('host')
  const port = Number(getConfigurationProperty('port')) || 3000

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(parseRequest)
  app.use(cors());
  app.options("*", cors())
  app.use('/', Routes)

  app.listen(port, host, (): void => {
    // eslint-disable-next-line no-console
    console.log(`Server started at ${host}:${port}`)
  })
}
