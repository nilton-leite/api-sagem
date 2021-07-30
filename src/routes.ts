import { Router } from 'express'

// Controllers
import { UsersController } from './controllers/users'

interface Controllers {
  usersController: UsersController
}

export default async ({ usersController }: Controllers) => {
  const router = Router()

  // Users routes
  router.post('/users', usersController.create.bind(usersController))
  // router.get('/users', usersController.find.bind(usersController))

  return router
}
