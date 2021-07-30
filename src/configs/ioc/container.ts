import { Express } from 'express'
import winston from 'winston'
import { Server } from '@src/server'
import { Knex } from 'knex'
import { MongoDB } from '@src/configs/databases/mongo'

import { HealthCheckController } from '@src/controllers/healthcheck'

import { IHealthCheckService } from '@src/services/healthcheck'

import { IHealthCheckRepository } from '@src/repositories/healthcheck'

interface Container {
  // CONFIGS --------------------------------------------
  /** API version */
  version: string
  /** Server port */
  port: number
  /** Enviornment */
  nodeEnv: string
  /** MongoDB connection string */
  mongoDBConnectionString: string

  // APP ------------------------------------------------
  app: Express
  logger: winston.Logger
  mongoDB: MongoDB
  server: Server

  // CONTROLLERS ----------------------------------------
  healthCheckController: HealthCheckController

  // SERVICES -------------------------------------------
  healthCheckService: IHealthCheckService

  // REPOSITORIES ---------------------------------------
  healthCheckRepository: IHealthCheckRepository
}

export default Container
