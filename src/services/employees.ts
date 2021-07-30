import Container from '@src/configs/ioc'
import { ICreate } from '@src/utils/types/users'

export interface IEmployeesService {
  create(params: { data: ICreate }): Promise<any>
}

export const EmployeesService = ({
  employeesRepository,
}: Container): IEmployeesService => {
  return {
    create: async (data) => {
      const saveData: any = await employeesRepository.create(data.data)
      return saveData
    },
  }
}
