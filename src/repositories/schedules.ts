import Container from '@src/configs/ioc'
import SchedulesModel from '@src/models/schedules'
import { ICreate } from '@src/utils/types/models/schedules'

export interface ISchedulesRepository {
  create(params: ICreate): Promise<any>
}

export const SchedulesRepository = ({}: Container): ISchedulesRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await SchedulesModel.create(params)
      return item
    },
  }
}
