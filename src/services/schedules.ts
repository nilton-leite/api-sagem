import Container from '@src/configs/ioc'
import { ICreate } from '@src/utils/types/models/schedules'

export interface ISchedulesService {
  create(params: { data: ICreate }): Promise<any>
}

export const SchedulesService = ({
  schedulesRepository,
}: Container): ISchedulesService => {
  return {
    create: async (data) => {
      const saveData: any = await schedulesRepository.create(data.data)
      return saveData
    },
  }
}
