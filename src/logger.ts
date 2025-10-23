import { createWriteStream } from 'fs'
import { RPCError, RPCRequest, RPCResponse } from './types/types'
import { getConfigurationProperty } from './utils/configReader'

export function isSnifferActive(): boolean {
  return getLogConfig()?.sniffer ?? false;
}

export function snifferOutput(
  request: RPCRequest | string | undefined,
  response: RPCResponse | RPCError,
): string {
  return JSON.stringify({ request, response })
}

function getLogConfig() {
  const logging = getConfigurationProperty('logging')
  return logging
}

export function writeLog(severity: number, text: string) {
  const logConfig = getLogConfig()
  if (!logConfig.active) {
    return
  }

  // Logs only the severity higher
  const minLogLevel = getMinimumSeverityLevel()

  if (severity < minLogLevel) {
    return
  }

  const loggingType = logConfig.output

  const logFile = logConfig.fileName

  const logFormat = logConfig.format

  appendLog(loggingType, logFile, logFormat, severity, text)
  return
}

function appendLog(
  logType: string,
  logFile: string,
  logFormat: string,
  severity: number,
  text: string,
) {
  const now = new Date()

  let logMessage: string = `${now.toLocaleDateString()} ${now.toTimeString().split(' ')[0]} [${getSeverityString(severity)}] ${text}`
  if (logFormat === 'json') {
    try {
      logMessage = JSON.stringify({
        date: now.toLocaleDateString(),
        time: now.toTimeString().split(' ')[0],
        severity: getSeverityString(severity),
        message: JSON.parse(text),
      })
    } catch {
      logMessage = JSON.stringify({
        date: now.toLocaleDateString(),
        time: now.toTimeString().split(' ')[0],
        severity: getSeverityString(severity),
        message: text,
      })
    }
  }
  if (logType === 'console') {
    // eslint-disable-next-line no-console
    console.log(getConsoleColor(severity), logMessage)
    return
  }

  if (logType === 'file') {
    const stream = createWriteStream(logFile, { flags: 'a' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    stream.once('open', function (fd) {
      stream.write(logMessage + '\r\n')
    })
  }
}

function getConsoleColor(severity: number) {
  switch (severity) {
    case 0:
      return '\x1b[37m%s\x1b[0m'
    case 1:
      return '\x1b[33m%s\x1b[0m'
    case 2:
      return '\x1b[31m%s\x1b[0m'
    default:
      return `white`
  }
}

function getSeverityString(severity: number) {
  switch (severity) {
    case 0:
      return 'INFO'
    case 1:
      return 'WARN'
    case 2:
      return 'DANGER'
    default:
      throw `Unknown severity: ${severity}`
  }
}

function getMinimumSeverityLevel(): number {
  const minLogIndex = process.argv.slice(2).indexOf('--min-log')

  if (minLogIndex == 0) {
    return 0
  }

  return Number(process.argv.slice(2)[minLogIndex + 1])
}
