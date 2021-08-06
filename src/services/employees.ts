import Container from '@src/configs/ioc'
import { ICreate, IFindById } from '@src/utils/types/models/employees'

export interface IEmployeesService {
  create(params: { data: ICreate }): Promise<any>
  findById(params: { data: IFindById }): Promise<any>
}

export const EmployeesService = ({
  employeesRepository,
}: Container): IEmployeesService => {
  return {
    create: async (data) => {
      const saveData: any = await employeesRepository.create(data.data)
      return saveData
    },
    findById: async (data) => {
      const saveData: any = await employeesRepository.findById(data.data)
      return saveData
    },
  }
}
