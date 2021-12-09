import Container from '@src/configs/ioc'
import NotificationModel from '@src/models/notification'
import { ICreate } from '@src/utils/types/models/notification'

export interface INotificationRepository {
  create(params: ICreate): Promise<any>
}

export const NotificationRepository =
  ({}: Container): INotificationRepository => {
    return {
      create: async (params: ICreate) => {
        const item = await NotificationModel.create(params)
        return item
      },
    }
  }
