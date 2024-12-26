import express, { Application } from 'express'
import { parseRequest } from './utils/parser'

import Routes from './rpc/calls'

export function StartListening() {
  const app: Application = express()
  const port = process.env.PORT || 3000

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(parseRequest)
  app.use('/', Routes)

  app.listen(port, (): void => {})
}