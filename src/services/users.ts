import Container from '@src/configs/ioc'
import { ICreate } from '@src/utils/types/users'

export interface IUsersService {
  create(params: { data: ICreate }): Promise<any>
}

export const UsersService = ({ usersRepository }: Container): IUsersService => {
  return {
    create: async (data) => {
      const saveData: any = await usersRepository.create(data.data)
      return saveData
    },
  }
}
