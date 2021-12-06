import Container from '@src/configs/ioc'
import { ICreate, IGet, IGetId } from '@src/utils/types/models/schedules'
import { Document, Types } from 'mongoose'

export interface ISchedulesService {
  create(params: { data: ICreate }): Promise<any>
  cancel(scheduleId: Types.ObjectId, userId: Types.ObjectId): Promise<any>
  getByDate(params: { data: IGet }): Promise<any>
  getById(params: { data: IGetId }): Promise<any>
  get(
    userId: Types.ObjectId,
    text: any,
    serviceId?: Types.ObjectId | null,
    cancel?: Boolean | any
  ): Promise<any>
}

export const SchedulesService = ({
  schedulesRepository,
}: Container): ISchedulesService => {
  return {
    create: async (data) => {
      const saveData: any = await schedulesRepository.create(data.data)
      return saveData
    },
    cancel: async (scheduleId, userId) => {
      const saveData: any = await schedulesRepository.cancel(scheduleId, userId)
      return saveData
    },
    getByDate: async (data) => {
      const getData: any = await schedulesRepository.getByDate(data.data)
      return getData
    },
    getById: async (data) => {
      const getData: any = await schedulesRepository.getById(data.data)
      return getData
    },
    get: async (userId, text, serviceId, cancel) => {
      const getData: any = await schedulesRepository.get(
        userId,
        text,
        serviceId,
        cancel
      )
      return getData
    },
  }
}
