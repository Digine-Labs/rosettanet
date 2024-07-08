import { createWriteStream } from "fs";
export function writeLog(severity: number, text: string) {
    const startArguments = process.argv.slice(2);
    if(startArguments.indexOf('--enable-logs') == -1) {
        // logging disabled
        return;
    }

    let loggingType = "console"

    if(startArguments.indexOf('--logging-type') > -1) {
        const typeIndex = startArguments.indexOf('--logging-type');
        const typeValueIndex = typeIndex + 1;
        if(typeValueIndex > startArguments.length) {
            throw('logging-type value not exist')
        }
        loggingType = startArguments[typeValueIndex];
    }

    let logFile = "";

    if(loggingType === "file") {
        const logFileIndex = startArguments.indexOf("--logging-file");

        if(logFileIndex == -1 || startArguments.length < logFileIndex+1) {
            throw('logging-file value not exist')
        }

        logFile = startArguments[logFileIndex+1];
    }

    appendLog(loggingType, logFile, severity, text);
    return;
}

function appendLog(logType: string, logFile: string, severity: number, text:string) {
    const logMessage: string = `[${getSeverityString(severity)}] ${text}`
    if(logType === "console") {
        // eslint-disable-next-line no-console
        console.log(logMessage)
        return;
    }

    if(logType === "file") {
        const stream = createWriteStream(logFile, {'flags': 'a'});
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        stream.once('open', function(fd) {
            stream.write(logMessage+"\r\n");
        });
    }
}

function getSeverityString(severity: number) {
    switch (severity) {
        case 0:
            return "INFO"
        case 1:
            return "WARN"
        case 2:
            return "DANGER"
        default:
            throw(`Unknown severity: ${severity}`)
    }
}