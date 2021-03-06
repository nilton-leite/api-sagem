import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import admin from 'firebase-admin'
import { Types } from 'mongoose'
import {
  ICreate,
  IPagination,
  NotificationOptions,
} from '@src/utils/types/models/notification'
import { INotificationService } from '@src/services/notification'
import { IUsersService } from '@src/services/users'

const envFound = dotenv.config()
if (!envFound) {
  throw new Error('.env file not found')
}

export class NotificationController {
  private logger: Logger
  private notificationService: INotificationService
  private usersService: IUsersService

  constructor({ logger, notificationService, usersService }: Container) {
    this.logger = logger
    this.notificationService = notificationService
    this.usersService = usersService

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            : 'null',
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      })
    }
  }

  public async get(req: Request, res: Response) {
    const { id } = req.body

    try {
      const dates = await this.notificationService.getDate(Types.ObjectId(id))
      return res.json(dates)
    } catch (error) {
      return res.json(error)
    }
  }

  public async find(req: Request, res: Response) {
    const { page = 1, pageLength = 10 } = req.query
    const parameter: IPagination = {
      page: parseInt(page.toString()),
      pageLength: parseInt(pageLength.toString()),
    }
    try {
      const not = await this.notificationService.find(parameter)
      return res.json({
        total: Math.ceil(
          not[0].metadata[0].total / parseInt(pageLength.toString())
        ),
        items: not,
      })
    } catch (error) {
      return res.json(error)
    }
  }

  public async send(req: Request, res: Response) {
    const { id, title, body } = req.body

    const retorno = await this.usersService.get(Types.ObjectId(id))
    let result = { status: true, message: 'Nenhum usu??rio encontrado!' }
    if (retorno) {
      const notification_options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
      }
      const rest: any = await this.sendNotification(
        retorno.token_firebase_messaging,
        title,
        body,
        notification_options
      )

      if (rest.status) {
        result = { status: true, message: 'Notifica????o enviada com sucesso!' }
        const parameters: ICreate = {
          title,
          body,
          userId: Types.ObjectId(id),
          sent: rest.response,
        }
        await this.notificationService.create({ data: parameters })
      } else {
        result = { status: false, message: rest.error }
      }
    }
    return res.json(result)
  }

  public async sendNotification(
    registrationToken: string,
    title: string,
    body: string,
    options: NotificationOptions
  ) {
    return new Promise(function (resolve) {
      const message_notification = {
        notification: {
          title: title,
          body: body,
        },
      }
      admin
        .messaging()
        .sendToDevice(registrationToken, message_notification, options)
        .then((response: any) => {
          if (response.results[0].error) {
            resolve({
              status: false,
              error: response.results[0].error.errorInfo.message,
              response: response,
            })
          } else {
            resolve({ status: true, error: null, response: response })
          }
        })
        .catch((error: any) => {
          resolve({ status: false, error: error })
        })
    })
  }
}
