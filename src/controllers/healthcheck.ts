import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import mongoose from 'mongoose'
import { IHealthCheckService } from '@src/services/healthcheck'

export class HealthCheckController {
  private logger: Logger
  private healthcheckService: IHealthCheckService

  constructor({ logger, healthCheckService }: Container) {
    this.logger = logger
    this.healthcheckService = healthCheckService
  }

  public async check(req: Request, res: Response) {
    console.log('usar')
  }
}
