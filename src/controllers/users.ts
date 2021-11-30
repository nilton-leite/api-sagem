import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import { IUsersService } from '@src/services/users'
import { ICreate, IFindOne, IFindOneLogin } from '@src/utils/types/models/users'

const envFound = dotenv.config()
if (!envFound) {
  throw new Error('.env file not found')
}

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
    return res.status(status.OK).send({
      _id: retorno._id,
      full_name: retorno.full_name,
      telephone: retorno.telephone,
      email: retorno.email,
      tokenFirebase: retorno.token_firebase,
      tokenFacebook: retorno.token_facebook,
      tokenGoogle: retorno.token_google,
    })
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

  public async login(req: Request, res: Response) {
    const { email, tokenFirebase } = req.body
    let token: String
    let result: any = {
      auth: false,
      token: null,
      message: 'Nenhum usuário encontrado com o email informado!',
    }
    if (email && tokenFirebase) {
      const param: IFindOneLogin = {
        email: email.toString(),
        token_firebase: tokenFirebase.toString(),
      }
      const retorno = await this.usersService.validateLogin({ data: param })

      if (retorno !== null) {
        token = jsonwebtoken.sign({ id: retorno._id }, `${process.env.SECRET}`)
        result = {
          auth: true,
          token: token,
          message: 'Login realizado com sucesso!',
        }
      }
    }

    return res.json(result)
  }
}
