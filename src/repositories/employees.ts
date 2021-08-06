import Container from '@src/configs/ioc'
import EmployeesModel from '@src/models/employees'
import { ICreate, IFindById } from '@src/utils/types/models/employees'

export interface IEmployeesRepository {
  create(params: ICreate): Promise<any>
  findById(params: IFindById): Promise<any>
}

export const EmployeesRepository = ({}: Container): IEmployeesRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await EmployeesModel.create(params)
      return item
    },
    findById: async (params: IFindById) => {
      const item = await EmployeesModel.findById(params)
      return item
    },
  }
}
