import Container from '@src/configs/ioc'
import { ICreate, IFindOne } from '@src/utils/types/models/users'

export interface IUsersService {
  create(params: { data: ICreate }): Promise<any>
  validateRegister(params: { data: IFindOne }): Promise<any>
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
  }
}
