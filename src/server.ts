import express, { Application } from 'express'
import { parseRequest } from './utils/parser'
import cors from 'cors'

import Routes from './rpc/calls'
import { getConfigurationProperty } from './utils/configReader'
import { writeLog } from './logger'
import { readFile } from 'fs'

export function StartListening() {
  const app: Application = express()
  const host = getConfigurationProperty('host')
  const port = Number(getConfigurationProperty('port')) || 3000

  app.use(cors())
  app.options('*', cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(parseRequest)
  app.use('/', Routes)

  const server = app.listen(port, host, (): void => {
    // eslint-disable-next-line no-console
    writeLog(0, `Server started at ${host}:${port}`)

    app.get('/logs', (req, res) => {
      const logging = getConfigurationProperty('logging')
      readFile(logging.fileName, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).send('Error reading log file')
        }
        res.setHeader('Content-Type', 'text/plain')
        res.send(data)
      })
    })
  })

  process.on("SIGINT", () => {
    writeLog(1,"🛑 Stopping Node...");
    server.close(() => {
      writeLog(1, "✅ Server stopped.");
      process.exit(0);
    });
  });
}
