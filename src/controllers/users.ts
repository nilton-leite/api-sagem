import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import mongoose from 'mongoose'
import { IUsersService } from '@src/services/users'
import { ICreate } from '@src/utils/types/users'

export class UsersController {
  private logger: Logger
  private usersService: IUsersService

  constructor({ logger, usersService }: Container) {
    this.logger = logger
    this.usersService = usersService
  }

  public async create(req: Request, res: Response) {
    const { full_name, cpf, telephone, email } = req.body

    let parameters: ICreate = {
      full_name: full_name,
      cpf: cpf,
      telephone: telephone,
      email: email,
    }

    const retorno = await this.usersService.create({ data: parameters })
    return res.status(status.OK).send(retorno)
  }
}
