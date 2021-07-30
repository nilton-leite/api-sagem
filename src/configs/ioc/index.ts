import * as awilix from 'awilix'
import express from 'express'
import dotenv from 'dotenv'
import Container from './container'
import { Server } from '@src/server'

import logger from '@src/configs/logs/winston'
import { MongoDB } from '@src/configs/databases/mongo'

import { UsersController } from '@src/controllers/users'

import { UsersService } from '@src/services/Users'

import { UsersRepository } from '@src/repositories/Users'

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

    // SERVICES ----------------------------------------------------------------------
    usersService: awilix.asFunction(UsersService),

    // REPOSITORIES ------------------------------------------------------------------
    usersRepository: awilix.asFunction(UsersRepository),
  }

  container.register(configs)

  // ASYNC CONFIGS -------------------------------------------------------------------

  const mongoDB = container.resolve('mongoDB') as MongoDB
  await mongoDB.connect()

  return container
}

export default Container
