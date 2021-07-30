import { createLogger, format, transports } from 'winston'
import stream from 'stream'
import moment from 'moment-timezone'
import Container from '../ioc'

export default function ({ nodeEnv }: Container) {
  const { combine, printf, json } = format

  const devFormat = printf(({ level, message, timestamp, error }) => {
    return error
      ? `${timestamp} [${level}] : ${message} \n ${error}`
      : `${timestamp} [${level}] : ${message}`
  })

  const appendTimestamp = format((info) => {
    info.timestamp = moment()
      .tz('America/Sao_Paulo')
      .format(
        nodeEnv === 'dev' ? 'DD/MM/YYYY HH:mm:ss' : 'YYYY-MM-DDTHH:mm:ss.SSSZ'
      )
    return info
  })

  const options = {
    consoleDev: {
      level: 'debug',
      format: combine(appendTimestamp(), devFormat),
    },
    consoleProd: {
      level: 'debug',
      format: combine(appendTimestamp(), json()),
    },
  }

  const logger = createLogger({
    handleExceptions: true,
    exitOnError: false,
    transports: [
      new transports.Console(
        nodeEnv === 'dev' ? options.consoleDev : options.consoleProd
      ),
    ],
  })

  logger.stream = (options?: any) =>
    new stream.Duplex({
      write: function (message: string, encoding: any) {
        logger.info(message)
      },
    })

  return logger
}
