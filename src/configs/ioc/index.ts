import * as awilix from 'awilix'
import express from 'express'
import dotenv from 'dotenv'
import Container from './container'
import { Server } from '@src/server'

import logger from '@src/configs/logs/winston'
import { MongoDB } from '@src/configs/databases/mongo'

import { UsersController } from '@src/controllers/users'
import { EmployeesController } from '@src/controllers/employees'
import { ServicesController } from '@src/controllers/services'
import { SchedulesController } from '@src/controllers/schedules'
import { NotificationController } from '@src/controllers/notification'

import { UsersService } from '@src/services/users'
import { EmployeesService } from '@src/services/employees'
import { ServicesService } from '@src/services/services'
import { SchedulesService } from '@src/services/schedules'
import { NotificationService } from '@src/services/notification'

import { UsersRepository } from '@src/repositories/users'
import { EmployeesRepository } from '@src/repositories/employees'
import { ServicesRepository } from '@src/repositories/services'
import { SchedulesRepository } from '@src/repositories/schedules'
import { NotificationRepository } from '@src/repositories/notification'

export async function createContainer(): Promise<awilix.AwilixContainer<any>> {
  const container = awilix.createContainer()

  // CONFIGS ------------------------------------------------------------------------

  const envFound = dotenv.config()
  if (!envFound) {
    throw new Error('.env file not found')
  }

  const configs: awilix.NameAndRegistrationPair<Container> = {
    version: awilix.asValue(`${process.env.VERSION}`),
    port: awilix.asValue(
      process.env.PORT ? parseInt(process.env.PORT, 10) : 3001
    ),
    nodeEnv: awilix.asValue(`${process.env.ENV}`),
    mongoDBConnectionString: awilix.asValue(
      `${process.env.MONGODB_CONNECTION_STRING}`
    ),

    // APP ---------------------------------------------------------------------------
    app: awilix.asValue(express()),
    logger: awilix.asFunction(logger),
    mongoDB: awilix.asClass(MongoDB),
    server: awilix.asClass(Server),

    // CONTROLLERS -------------------------------------------------------------------
    usersController: awilix.asClass(UsersController),
    employeesController: awilix.asClass(EmployeesController),
    servicesController: awilix.asClass(ServicesController),
    schedulesController: awilix.asClass(SchedulesController),
    notificationController: awilix.asClass(NotificationController),

    // SERVICES ----------------------------------------------------------------------
    usersService: awilix.asFunction(UsersService),
    employeesService: awilix.asFunction(EmployeesService),
    servicesService: awilix.asFunction(ServicesService),
    schedulesService: awilix.asFunction(SchedulesService),
    notificationService: awilix.asFunction(NotificationService),

    // REPOSITORIES ------------------------------------------------------------------
    usersRepository: awilix.asFunction(UsersRepository),
    employeesRepository: awilix.asFunction(EmployeesRepository),
    servicesRepository: awilix.asFunction(ServicesRepository),
    schedulesRepository: awilix.asFunction(SchedulesRepository),
    notificationRepository: awilix.asFunction(NotificationRepository),
  }

  container.register(configs)

  // ASYNC CONFIGS -------------------------------------------------------------------

  const mongoDB = container.resolve('mongoDB') as MongoDB
  await mongoDB.connect()

  return container
}

export default Container
