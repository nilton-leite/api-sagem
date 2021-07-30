import { Express } from 'express'
import winston from 'winston'
import { Server } from '@src/server'
import { Knex } from 'knex'
import { MongoDB } from '@src/configs/databases/mongo'

import { UsersController } from '@src/controllers/users'
import { EmployeesController } from '@src/controllers/employees'

import { IUsersService } from '@src/services/Users'
import { IEmployeesService } from '@src/services/employees'

import { IUsersRepository } from '@src/repositories/Users'
import { IEmployeesRepository } from '@src/repositories/employees'

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
  employeesController: EmployeesController

  // SERVICES -------------------------------------------
  usersService: IUsersService
  employeesService: IEmployeesService

  // REPOSITORIES ---------------------------------------
  usersRepository: IUsersRepository
  employeesRepository: IEmployeesRepository
}

export default Container
