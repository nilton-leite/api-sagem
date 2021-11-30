import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import { IUsersService } from '@src/services/users'
import { ICreate, IFindOne } from '@src/utils/types/models/users'

export class UsersController {
  private logger: Logger
  private usersService: IUsersService

  constructor({ logger, usersService }: Container) {
    this.logger = logger
    this.usersService = usersService
  }

  public async create(req: Request, res: Response) {
    const {
      full_name,
      telephone,
      email,
      tokenFirebase,
      tokenFacebook,
      tokenGoogle,
    } = req.body

    let parameters: ICreate = {
      full_name: full_name,
      telephone: telephone,
      email: email,
      token_firebase: tokenFirebase,
      token_facebook: tokenFacebook,
      token_google: tokenGoogle,
    }

    const retorno = await this.usersService.create({ data: parameters })
    return res.status(status.OK).send(retorno)
  }

  public async validateRegister(req: Request, res: Response) {
    const { email } = req.query
    let mensagem: any = { status: true, message: 'Disponível para cadastro!' }

    if (email) {
      const param: IFindOne = { email: email.toString() }
      const retorno = await this.usersService.validateRegister({ data: param })

      if (retorno !== null)
        mensagem = { status: false, message: 'E-mail já cadastrado!' }
    }

    return res.status(status.OK).send(mensagem)
  }
}
