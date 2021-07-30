import Container from '@src/configs/ioc'
import { ICreate } from '@src/utils/types/models/services'

export interface IServicesService {
  create(params: { data: ICreate }): Promise<any>
}

export const ServicesService = ({
  servicesRepository,
}: Container): IServicesService => {
  return {
    create: async (data) => {
      const saveData: any = await servicesRepository.create(data.data)
      return saveData
    },
  }
}
