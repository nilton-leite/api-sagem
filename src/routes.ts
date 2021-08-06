import { Router } from 'express'

// Controllers
import { UsersController } from './controllers/users'
import { EmployeesController } from './controllers/employees'
import { ServicesController } from './controllers/services'
import { SchedulesController } from './controllers/schedules'

interface Controllers {
  usersController: UsersController
  employeesController: EmployeesController
  servicesController: ServicesController
  schedulesController: SchedulesController
}

export default async ({
  usersController,
  employeesController,
  servicesController,
  schedulesController,
}: Controllers) => {
  const router = Router()

  // Users routes
  router.post('/users', usersController.create.bind(usersController))
  // router.get('/users', usersController.find.bind(usersController))

  router.post(
    '/employees',
    employeesController.create.bind(employeesController)
  )
  // router.get('/users', usersController.find.bind(usersController))

  router.post('/services', servicesController.create.bind(servicesController))
  router.get('/services', servicesController.find.bind(servicesController))

  router.get('/schedules', schedulesController.find.bind(schedulesController))

  return router
}
