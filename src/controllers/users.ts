import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import { IUsersService } from '@src/services/users'
import {
  ICreate,
  IFindOne,
  IFindOneLogin,
  IUpdate,
} from '@src/utils/types/models/users'
import { Types } from 'mongoose'

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
      tokenFirebaseMessaging,
      tokenFirebase,
      tokenFacebook,
      tokenGoogle,
    } = req.body

    let parameters: ICreate = {
      full_name: full_name,
      telephone: telephone,
      email: email,
      token_firebase_messaging: tokenFirebaseMessaging,
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
      tokenFirebaseMessaging: retorno.token_firebase_messaging,
      tokenFirebase: retorno.token_firebase,
      tokenFacebook: retorno.token_facebook,
      tokenGoogle: retorno.token_google,
    })
  }

  public async update(req: Request, res: Response) {
    const { full_name, telephone, email, id } = req.body

    let parameters: IUpdate = {
      full_name: full_name,
      telephone: telephone,
    }

    await this.usersService.updateOne({ data: parameters }, Types.ObjectId(id))
    const retorno = await this.usersService.get(Types.ObjectId(id))
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

  public async login(req: Request, res: Response) {
    const { email, tokenFirebase, tokenFirebaseMessaging } = req.body
    let token: String
    let result: any = {
      auth: false,
      token: null,
      message: 'Nenhum usuário encontrado com o email informado!',
      id: null,
      fullName: null,
      telephone: null,
      tokenFirebase: null,
      tokenFacebook: null,
      tokenGoogle: null,
    }
    if (email && tokenFirebase) {
      const param: IFindOneLogin = {
        email: email.toString(),
        token_firebase: tokenFirebase.toString(),
      }
      const retorno = await this.usersService.validateLogin({ data: param })

      if (retorno !== null) {
        if (
          !retorno.token_firebase_messaging ||
          retorno.token_firebase_messaging !== tokenFirebaseMessaging
        ) {
          await this.usersService.updateTokenFirebaseMessaging(
            retorno._id,
            tokenFirebaseMessaging
          )
          retorno.token_firebase_messaging = tokenFirebaseMessaging
        }

        token = jsonwebtoken.sign({ id: retorno._id }, `${process.env.SECRET}`)
        result = {
          auth: true,
          token: token,
          message: 'Login realizado com sucesso!',
          id: retorno._id,
          fullName: retorno.full_name,
          telephone: retorno.telephone,
          tokenFirebaseMessaging: retorno.token_firebase_messaging,
          tokenFirebase: retorno.token_firebase,
          tokenFacebook: retorno.token_facebook,
          tokenGoogle: retorno.token_google,
        }
      }
    }

    return res.json(result)
  }

  async get(req: Request, res: Response) {
    const { id } = req.body

    try {
      if (id) {
        const retorno = await this.usersService.get(Types.ObjectId(id))

        return res.json([retorno])
      }

      return res.json([])
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }
}
