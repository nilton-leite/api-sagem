import Container from '@src/configs/ioc'
import { ICreate } from '@src/utils/types/models/notification'

export interface INotificationService {
  create(params: { data: ICreate }): Promise<any>
}

export const NotificationService = ({
  notificationRepository,
}: Container): INotificationService => {
  return {
    create: async (data) => {
      const saveData: any = await notificationRepository.create(data.data)
      return saveData
    },
  }
}
