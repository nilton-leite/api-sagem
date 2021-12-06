import Container from '@src/configs/ioc'
import { ICreate, IFindOne, IFindOneLogin } from '@src/utils/types/models/users'
import { Types } from 'mongoose'

export interface IUsersService {
  create(params: { data: ICreate }): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
  validateRegister(params: { data: IFindOne }): Promise<any>
  validateLogin(params: { data: IFindOneLogin }): Promise<any>
}

export const UsersService = ({ usersRepository }: Container): IUsersService => {
  return {
    create: async (data) => {
      const saveData: any = await usersRepository.create(data.data)
      return saveData
    },
    validateRegister: async (data) => {
      const getData: any = await usersRepository.validateRegister(data.data)
      return getData
    },
    validateLogin: async (data) => {
      const getData: any = await usersRepository.validateLogin(data.data)
      return getData
    },
    get: async (userId) => {
      const getData: any = await usersRepository.get(userId)
      return getData
    },
  }
}
