import Container from '@src/configs/ioc'
import UsersModel from '@src/models/users'
import { ICreate, IFindOne, IFindOneLogin } from '@src/utils/types/models/users'
import { Types } from 'mongoose'

export interface IUsersRepository {
  create(params: ICreate): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
  validateRegister(params: IFindOne): Promise<any>
  validateLogin(params: IFindOneLogin): Promise<any>
}

export const UsersRepository = ({}: Container): IUsersRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await UsersModel.create(params)
      return item
    },
    validateRegister: async (params: IFindOne) => {
      const item = await UsersModel.findOne(params)
      return item
    },
    validateLogin: async (params: IFindOneLogin) => {
      const item = await UsersModel.findOne(params)
      return item
    },
    get: async (userId: Types.ObjectId) => {
      const item = await UsersModel.findOne({ _id: userId })
      return item
    },
  }
}
