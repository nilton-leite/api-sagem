import Container from '@src/configs/ioc'
import UsersModel from '@src/models/users'
import { ICreate, IFindOne } from '@src/utils/types/models/users'

export interface IUsersRepository {
  create(params: ICreate): Promise<any>
  validateRegister(params: IFindOne): Promise<any>
}

export const UsersRepository = ({}: Container): IUsersRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await UsersModel.create(params)
      return item
    },
    validateRegister: async (params: ICreate) => {
      const item = await UsersModel.findOne(params)
      return item
    },
  }
}
