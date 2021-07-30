import { Router } from 'express'

// Controllers
import { UsersController } from './controllers/users'
import { EmployeesController } from './controllers/employees'

interface Controllers {
  usersController: UsersController
  employeesController: EmployeesController
}

export default async ({
  usersController,
  employeesController,
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

  return router
}
