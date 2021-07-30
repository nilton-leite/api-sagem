import { Express } from 'express'
import winston from 'winston'
import { Server } from '@src/server'
import { Knex } from 'knex'
import { MongoDB } from '@src/configs/databases/mongo'

import { UsersController } from '@src/controllers/users'

import { IUsersService } from '@src/services/Users'

import { IUsersRepository } from '@src/repositories/Users'

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
  usersController: UsersController

  // SERVICES -------------------------------------------
  usersService: IUsersService

  // REPOSITORIES ---------------------------------------
  usersRepository: IUsersRepository
}

export default Container
