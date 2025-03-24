import express, { Application, Request, Response, NextFunction } from 'express'
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

  app.use((req, res, next) => {
    if (req.method !== 'POST') {
      return res.status(405).json({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32600,
          message: 'Invalid Request',
        },
      })
    }
    next()
  })
  // Handle text/plain content type
  app.use((req, res, next) => {
    if (req.headers['content-type'] === 'text/plain') {
      let data = ''
      req.on('data', chunk => {
        data += chunk
      })
      req.on('end', () => {
        try {
          req.body = JSON.parse(data)
          next()
        } catch (e) {
          return res.status(400).json({
            jsonrpc: '2.0',
            id: null,
            error: {
              code: -32700,
              message: 'Parse error',
            },
          })
        }
      })
    } else {
      next()
    }
  })

  // Handle missing content type
  app.use((req, res, next) => {
    if (!req.headers['content-type'] && req.method === 'POST') {
      let data = ''
      req.on('data', chunk => {
        data += chunk
      })
      req.on('end', () => {
        try {
          req.body = JSON.parse(data)
          next()
        } catch (e) {
          return res.status(400).json({
            jsonrpc: '2.0',
            id: null,
            error: {
              code: -32700,
              message: 'Parse error',
            },
          })
        }
      })
    } else {
      next()
    }
  })

  app.use(cors())
  app.options('*', cors())

  // Express error handler for JSON parsing errors
  app.use(
    express.json({
      strict: true,
      limit: '1mb',
      verify: (req, res, buf) => {
        try {
          JSON.parse(buf.toString())
        } catch (e) {
          throw new Error('Invalid JSON')
        }
      },
    }),
  )

  // Standard express error handler
  app.use(express.json())

  // Error handler for JSON parsing errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32700,
          message: 'Parse error',
        },
      })
    }
    next(err)
  })
  app.use(express.urlencoded({ extended: true }))
  app.use(parseRequest)

  // Handle HTTP method validation - only allow POST for JSON-RPC
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

  process.on('SIGINT', () => {
    writeLog(1, '🛑 Stopping Node...')
    server.close(() => {
      writeLog(1, '✅ Server stopped.')
      process.exit(0)
    })
  })
}
