import Container from '@src/configs/ioc'
import NotificationModel from '@src/models/notification'
import { ICreate } from '@src/utils/types/models/notification'
import { Types } from 'mongoose'

export interface INotificationRepository {
  create(params: ICreate): Promise<any>
  getDate(userId: Types.ObjectId): Promise<any>
}

export const NotificationRepository =
  ({}: Container): INotificationRepository => {
    return {
      create: async (params: ICreate) => {
        const item = await NotificationModel.create(params)
        return item
      },
      getDate: async (userId: Types.ObjectId) => {
        const item = await NotificationModel.aggregate([
          {
            $match: {
              userId: userId,
            },
          },

          {
            $group: {
              _id: {
                date: {
                  $dateToString: {
                    format: '%d/%m/%Y',
                    date: '$dateInsert',
                  },
                },
              },
              count: { $sum: 1 },
              messages: {
                $push: {
                  title: '$title',
                  body: '$body',
                  date: {
                    $dateToString: {
                      format: '%d-%m-%Y %H:%M',
                      date: '$dateInsert',
                      timezone: '-0300',
                    },
                  },
                },
              },
            },
          },
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $project: {
              _id: 0,
              dateInsert: '$_id.date',
              count: 1,
              messages: 1,
            },
          },
        ])
        return item
      },
    }
  }
