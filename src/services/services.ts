import Container from '@src/configs/ioc'
import { ICreate, IFindById } from '@src/utils/types/models/services'

export interface IServicesService {
  create(params: { data: ICreate }): Promise<any>
  findById(params: { data: IFindById }): Promise<any>
  find(): Promise<any>
}

export const ServicesService = ({
  servicesRepository,
}: Container): IServicesService => {
  return {
    create: async (data) => {
      const saveData: any = await servicesRepository.create(data.data)
      return saveData
    },
    findById: async (data) => {
      const findData: any = await servicesRepository.findById(data.data)
      return findData
    },
    find: async () => {
      const findData: any = await servicesRepository.find()
      return findData
    },
  }
}
