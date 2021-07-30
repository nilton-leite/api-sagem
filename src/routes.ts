import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import * as YAML from 'yamljs'
import cron from 'node-cron'

// Controllers
import { HealthCheckController } from './controllers/healthcheck'

interface Controllers {
  healthCheckController: HealthCheckController
}

export default async ({ healthCheckController }: Controllers) => {
  const router = Router()

  // Healthcheck routes
  router.get(
    '/healthcheck',
    healthCheckController.check.bind(healthCheckController)
  )

  return router
}
