import { Router } from 'express'
import cron from 'node-cron'

// Controllers
import { UsersController } from './controllers/users'
import { EmployeesController } from './controllers/employees'
import { ServicesController } from './controllers/services'
import { SchedulesController } from './controllers/schedules'
import { NotificationController } from './controllers/notification'

interface Controllers {
  usersController: UsersController
  employeesController: EmployeesController
  servicesController: ServicesController
  schedulesController: SchedulesController
  notificationController: NotificationController
}

export default async ({
  usersController,
  employeesController,
  servicesController,
  schedulesController,
  notificationController,
}: Controllers) => {
  const router = Router()

  // Users routes
  router.post('/users', usersController.create.bind(usersController))
  router.get(
    '/user/validate',
    usersController.validateRegister.bind(usersController)
  )
  router.post('/login', usersController.login.bind(usersController))

  router.post(
    '/employees',
    employeesController.create.bind(employeesController)
  )
  // router.get('/users', usersController.find.bind(usersController))

  router.post('/services', servicesController.create.bind(servicesController))
  router.get('/services', servicesController.find.bind(servicesController))

  router.post('/schedules', schedulesController.save.bind(schedulesController))
  router.get('/schedules', schedulesController.find.bind(schedulesController))
  router.get(
    '/schedules/cancel',
    schedulesController.cancel.bind(schedulesController)
  )

  router.get(
    '/schedulesUser',
    schedulesController.get.bind(schedulesController)
  )
  router.get('/user', usersController.get.bind(usersController))
  router.put('/user', usersController.update.bind(usersController))

  router.post(
    '/firebase/notification',
    notificationController.send.bind(notificationController)
  )

  // Roda todo dia as 06 da manhã - Exclui todos os agendamentos que passaram da data
  cron.schedule('0 6 * * *', () => schedulesController.cancelSchedules())

  // Roda todo dia as 08 da manhã, mandando notificação pedindo para confirmar o agendamento
  cron.schedule('0 8 * * *', () => schedulesController.confirmSchedule())

  return router
}
