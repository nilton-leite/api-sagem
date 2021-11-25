import Container from '@src/configs/ioc'
import SchedulesModel from '@src/models/schedules'
import { ICreate, IGet } from '@src/utils/types/models/schedules'
import { Types } from 'mongoose'

export interface ISchedulesRepository {
  create(params: ICreate): Promise<any>
  getByDate(params: IGet): Promise<any>
}

export const SchedulesRepository = ({}: Container): ISchedulesRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await SchedulesModel.create(params)
      return item
    },
    getByDate: async (params: IGet) => {
      const item = await SchedulesModel.find({
        userId: params.userId,
        employeeId: params.employeeId,
        serviceId: params.serviceId,
        dataSchedule: params.dataSchedule,
      })
      return item
    },
  }
}
