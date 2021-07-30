import { Express, Router, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { Logger } from 'winston'
import routes from './routes'
import Container from './configs/ioc'
import { UsersController } from './controllers/users'
import { EmployeesController } from './controllers/employees'
import AuthenticationMiddleware from './middlewares/authentication'
import cors from 'cors'

export class Server {
  private app: Express
  private port: number
  private logType: string
  private usersController: UsersController
  private employeesController: EmployeesController
  private logger: Logger

  constructor({
    app,
    port,
    nodeEnv,
    usersController,
    employeesController,
    logger,
  }: Container) {
    this.app = app
    this.port = port
    this.logType =
      nodeEnv === 'dev' ? 'dev' : ':method :url :status :response-time'
    this.usersController = usersController
    this.employeesController = employeesController
    this.logger = logger
  }

  private async init(): Promise<void> {
    this.setupExpress()
    await this.setupRoutes()
  }

  private setupExpress(): void {
    this.app.use(
      morgan(this.logType, {
        stream: {
          write: (message: any) => {
            this.logger.info(message)
          },
        },
      })
    )
    this.app.use(bodyParser.json({ type: '*/*', limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    // this.app.use(AuthenticationMiddleware(this.logType))
    if (this.logType === 'dev') this.app.use(cors())
  }

  private async setupRoutes(): Promise<void> {
    const router = await routes({
      usersController: this.usersController,
      employeesController: this.employeesController,
    })

    this.app.use(router)

    this.app.use(function (
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      console.error(err.stack)
      res.status(500).send('Internal server error.')
    })
  }

  public getApp(): Express {
    return this.app
  }

  public start() {
    this.init()
    this.app.listen(this.port, () => {
      this.logger.info({
        message: `Server listening on port ${this.port}.`,
        path: __filename,
      })
    })
  }
}
