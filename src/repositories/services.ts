import Container from '@src/configs/ioc'
import ServicesModel from '@src/models/services'
import { ICreate, IFindById } from '@src/utils/types/models/services'

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
            localField: 'employees',
            foreignField: '_id',
            as: 'employees',
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            price: 1,
            start_time: 1,
            end_time: 1,
            interval_time: 1,
            icon: 1,
            active: 1,
            'employees._id': 1,
            'employees.full_name': 1,
            'employees.cpf': 1,
            'employees.telephone': 1,
            'employees.email': 1,
            'employees.description': 1,
          },
        },
      ])
      return item
    },
  }
}
