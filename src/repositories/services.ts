import Container from '@src/configs/ioc'
import ServicesModel from '@src/models/services'
import EmployeesModel from '@src/models/employees'
import { ICreate, IFindById } from '@src/utils/types/models/services'
import { Types } from 'mongoose'

export interface IServicesRepository {
  create(params: ICreate): Promise<any>
  find(): Promise<any>
  findById(params: IFindById): Promise<any>
}

export const ServicesRepository = ({}: Container): IServicesRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await ServicesModel.create(params)
      return item
    },
    findById: async (params: IFindById) => {
      const item = await ServicesModel.findById(params)
      return item
    },
    find: async () => {
      const item = await ServicesModel.aggregate([
        {
          $lookup: {
            from: 'employees',
            localField: '_id',
            foreignField: 'services.serviceId',
            as: 'employees',
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            price_default: 1,
            execution_time_default: 1,
            active: 1,
            icon: 1,
            'employees._id': 1,
            'employees.full_name': 1,
            'employees.cpf': 1,
            'employees.telephone': 1,
            'employees.email': 1,
            'employees.description': 1,
            'employees.services': 1,
          },
        },
      ])
      return item
    },
  }
}
