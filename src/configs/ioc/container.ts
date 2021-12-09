import { Express } from 'express'
import winston from 'winston'
import { Server } from '@src/server'
import { Knex } from 'knex'
import { MongoDB } from '@src/configs/databases/mongo'

import { UsersController } from '@src/controllers/users'
import { EmployeesController } from '@src/controllers/employees'
import { ServicesController } from '@src/controllers/services'
import { SchedulesController } from '@src/controllers/schedules'
import { NotificationController } from '@src/controllers/notification'

import { IUsersService } from '@src/services/Users'
import { IEmployeesService } from '@src/services/employees'
import { IServicesService } from '@src/services/services'
import { ISchedulesService } from '@src/services/schedules'
import { INotificationService } from '@src/services/notification'

import { IUsersRepository } from '@src/repositories/Users'
import { IEmployeesRepository } from '@src/repositories/employees'
import { IServicesRepository } from '@src/repositories/services'
import { ISchedulesRepository } from '@src/repositories/schedules'
import { INotificationRepository } from '@src/repositories/notification'

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
  servicesController: ServicesController
  schedulesController: SchedulesController
  notificationController: NotificationController

  // SERVICES -------------------------------------------
  usersService: IUsersService
  employeesService: IEmployeesService
  servicesService: IServicesService
  schedulesService: ISchedulesService
  notificationService: INotificationService

  // REPOSITORIES ---------------------------------------
  usersRepository: IUsersRepository
  employeesRepository: IEmployeesRepository
  servicesRepository: IServicesRepository
  schedulesRepository: ISchedulesRepository
  notificationRepository: INotificationRepository
}

export default Container
