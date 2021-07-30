import Container from '@src/configs/ioc'
import EmployeesModel from '@src/models/employees'
import { ICreate } from '@src/utils/types/models/users'

export interface IEmployeesRepository {
  create(params: ICreate): Promise<any>
}

export const EmployeesRepository = ({}: Container): IEmployeesRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await EmployeesModel.create(params)
      return item
    },
  }
}
