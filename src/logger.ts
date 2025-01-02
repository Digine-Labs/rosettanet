import { createWriteStream } from 'fs'
import { RPCError, RPCRequest, RPCResponse } from './types/types'

export function isSnifferActive(): boolean {
  return process.argv.slice(2).indexOf('--sniffer') > -1
}

export function snifferOutput(
  request: RPCRequest | string | undefined,
  response: RPCResponse | RPCError,
): string {
  return JSON.stringify({ request, response })
}

export function writeLog(severity: number, text: string) {
  const startArguments = process.argv.slice(2)
  if (startArguments.indexOf('--enable-logs') == -1 && severity < 2) {
    // logging disabled
    return
  }

  // Logs only the severity higher
  const minLogLevel = getMinimumSeverityLevel()

  if (severity < minLogLevel) {
    return
  }

  let loggingType = 'console'

  if (startArguments.indexOf('--logging-type') > -1) {
    const typeIndex = startArguments.indexOf('--logging-type')
    const typeValueIndex = typeIndex + 1
    if (typeValueIndex > startArguments.length) {
      throw 'logging-type value not exist'
    }
    loggingType = startArguments[typeValueIndex]
  }

  let logFile = ''

  if (loggingType === 'file') {
    const logFileIndex = startArguments.indexOf('--logging-file')

    if (logFileIndex == -1 || startArguments.length < logFileIndex + 1) {
      throw 'logging-file value not exist'
    }

    logFile = startArguments[logFileIndex + 1]
  }

  let logFormat = 'text'
  if (startArguments.indexOf('--log-json') > -1) {
    logFormat = 'json'
  }

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
    } catch (error) {
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
