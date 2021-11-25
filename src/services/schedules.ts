import Container from '@src/configs/ioc'
import { ICreate, IGet } from '@src/utils/types/models/schedules'

export interface ISchedulesService {
  create(params: { data: ICreate }): Promise<any>
  getByDate(params: { data: IGet }): Promise<any>
}

export const SchedulesService = ({
  schedulesRepository,
}: Container): ISchedulesService => {
  return {
    create: async (data) => {
      const saveData: any = await schedulesRepository.create(data.data)
      return saveData
    },
    getByDate: async (data) => {
      const getData: any = await schedulesRepository.getByDate(data.data)
      return getData
    },
  }
}
