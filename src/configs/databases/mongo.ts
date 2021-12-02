import mongoose from 'mongoose'
import winston from 'winston'
import Container from '../ioc'
import fs from 'fs'

export class MongoDB {
  private mongoDBConnectionString: string
  private logger: winston.Logger

  constructor({ mongoDBConnectionString, logger }: Container) {
    this.mongoDBConnectionString = mongoDBConnectionString
    this.logger = logger
  }

  public async connect(): Promise<void> {
    this.logger.info({
      message: `Connecting to MongoDB...`,
      path: __filename,
    })
    if (process.env.ENV === 'dev') {
      mongoose.connect(this.mongoDBConnectionString, {
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      mongoose.set('debug', true)
    } else {
      const ca = [fs.readFileSync('/etc/ssl/ca.pem')]
      const cert = fs.readFileSync('/etc/ssl/cert.pem')
      const key = fs.readFileSync('/etc/ssl/key.pem')

      mongoose.connect(this.mongoDBConnectionString, {
        autoIndex: true,
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        sslCert: cert,
        sslKey: key,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    }
    const db = mongoose.connection
    db.on('error', (e) => {
      this.logger.error({
        message: `Error connecting to MongoDB.`,
        error: e,
        path: __filename,
      })
    })
    db.once('open', () => {
      this.logger.info({
        message: `Successfuly connected to MongoDB.`,
        path: __filename,
      })
    })
  }
}
