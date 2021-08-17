import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import { IServicesService } from '@src/services/services'
import { ICreate } from '@src/utils/types/models/services'
import { IEmployeesService } from '@src/services/employees'
import { ConsoleTransportOptions } from 'winston/lib/winston/transports'

import { Types } from 'mongoose'

export class ServicesController {
  private logger: Logger
  private servicesService: IServicesService
  private employeesService: IEmployeesService

  constructor({ logger, servicesService, employeesService }: Container) {
    this.logger = logger
    this.servicesService = servicesService
    this.employeesService = employeesService
  }

  public async create(req: Request, res: Response) {
    const {
      title,
      description,
      price_default,
      execution_time_default,
      active,
      icon,
    } = req.body

    let parameters: ICreate = {
      title: title,
      description: description,
      price_default: price_default,
      execution_time_default: execution_time_default,
      active: active,
      icon: icon,
    }

    const retorno = await this.servicesService.create({ data: parameters })
    return res.status(status.OK).send(retorno)
  }

  public async find(req: Request, res: Response) {
    const retorno = true
    const service = await this.servicesService.find() //Pega todos os serviços

    for (let i = 0; i < service.length; i++) {
      for (let j = 0; j < service[i].employees.length; j++) {
        for (let k = 0; k < service[i].employees[j].services.length; k++) {
          let se = service[i].employees[j].services.filter(
            (s: { serviceId: String }) => (s.serviceId = service[i]._id)
          )
          service[i].employees[j].price = se[0].price
          service[i].employees[j].execution_time = se[0].execution_time
        }
      }
    }

    if (retorno === null) {
      return res.status(400).send('Nenhum serviço disponível!')
    }

    return res.status(status.OK).send(service)
  }
}
