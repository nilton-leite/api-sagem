import Container from '@src/configs/ioc'
import EmployeesModel from '@src/models/employees'
import {
  ICreate,
  IFindById,
  IFindByService,
} from '@src/utils/types/models/employees'

export interface IEmployeesRepository {
  create(params: ICreate): Promise<any>
  find(): Promise<any>
  findById(params: IFindById): Promise<any>
  findByService(params: IFindByService): Promise<any>
}

export const EmployeesRepository = ({}: Container): IEmployeesRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await EmployeesModel.create(params)
      return item
    },
    find: async () => {
      const item = await EmployeesModel.find()
      return item
    },
    findById: async (params: IFindById) => {
      const item = await EmployeesModel.findById(params)
      return item
    },
    findByService: async (params: IFindByService) => {
      const item = await EmployeesModel.find({
        'services.serviceId': params.serviceId,
      })
      return item
    },
  }
}
