import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import { IEmployeesService } from '@src/services/employees'
import { ICreate } from '@src/utils/types/models/employees'

export class EmployeesController {
  private logger: Logger
  private employeesService: IEmployeesService

  constructor({ logger, employeesService }: Container) {
    this.logger = logger
    this.employeesService = employeesService
  }

  public async create(req: Request, res: Response) {
    const {
      full_name,
      cpf,
      telephone,
      email,
      description,
      active,
      start_time,
      end_time,
    } = req.body

    let parameters: ICreate = {
      full_name: full_name,
      cpf: cpf,
      telephone: telephone,
      email: email,
      description: description,
      active: active,
      start_time: start_time,
      end_time: end_time,
      // TODO colocar os services
    }

    const retorno = await this.employeesService.create({ data: parameters })
    return res.status(status.OK).send(retorno)
  }
}
