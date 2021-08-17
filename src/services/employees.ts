import Container from '@src/configs/ioc'
import {
  ICreate,
  IFindById,
  IFindByService,
} from '@src/utils/types/models/employees'

export interface IEmployeesService {
  create(params: { data: ICreate }): Promise<any>
  find(): Promise<any>
  findById(params: { data: IFindById }): Promise<any>
  findByService(params: { data: IFindByService }): Promise<any>
}

export const EmployeesService = ({
  employeesRepository,
}: Container): IEmployeesService => {
  return {
    create: async (data) => {
      const saveData: any = await employeesRepository.create(data.data)
      return saveData
    },
    find: async () => {
      const item: any = await employeesRepository.find()
      return item
    },
    findById: async (data) => {
      const item: any = await employeesRepository.findById(data.data)
      return item
    },
    findByService: async (data) => {
      const item: any = await employeesRepository.findByService(data.data)
      return item
    },
  }
}
