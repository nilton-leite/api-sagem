import Container from '@src/configs/ioc'
import { ICreate, IPagination } from '@src/utils/types/models/notification'
import { Types } from 'mongoose'

export interface INotificationService {
  create(params: { data: ICreate }): Promise<any>
  getDate(userId: Types.ObjectId): Promise<any>
  find(params: IPagination): Promise<any>
}

export const NotificationService = ({
  notificationRepository,
}: Container): INotificationService => {
  return {
    create: async (data) => {
      const saveData: any = await notificationRepository.create(data.data)
      return saveData
    },
    getDate: async (userId) => {
      const saveData: any = await notificationRepository.getDate(userId)
      return saveData
    },
    find: async (params) => {
      const getData: any = await notificationRepository.find(params)
      return getData
    },
  }
}
