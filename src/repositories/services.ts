import Container from '@src/configs/ioc'
import ServicesModel from '@src/models/services'
import { ICreate } from '@src/utils/types/models/services'

export interface IServicesRepository {
  create(params: ICreate): Promise<any>
}

export const ServicesRepository = ({}: Container): IServicesRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await ServicesModel.create(params)
      return item
    },
  }
}
