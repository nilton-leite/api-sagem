import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import { IServicesService } from '@src/services/services'
import { ICreate } from '@src/utils/types/models/services'

export class ServicesController {
  private logger: Logger
  private servicesService: IServicesService

  constructor({ logger, servicesService }: Container) {
    this.logger = logger
    this.servicesService = servicesService
  }

  public async create(req: Request, res: Response) {
    const {
      title,
      description,
      price_default,
      execution_time_default,
      active,
    } = req.body

    let parameters: ICreate = {
      title: title,
      description: description,
      price_default: price_default,
      execution_time_default: execution_time_default,
      active: active,
    }

    const retorno = await this.servicesService.create({ data: parameters })
    return res.status(status.OK).send(retorno)
  }

  public async find(req: Request, res: Response) {
    const retorno = await this.servicesService.find()
    if (retorno === null) {
      return res.status(400).send('Nenhum serviço disponível!')
    }

    return res.status(status.OK).send(retorno)
  }
}
