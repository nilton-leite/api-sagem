import Container from '@src/configs/ioc'
import NotificationModel from '@src/models/notification'
import { ICreate, IPagination } from '@src/utils/types/models/notification'
import { Types } from 'mongoose'

export interface INotificationRepository {
  create(params: ICreate): Promise<any>
  getDate(userId: Types.ObjectId): Promise<any>
  find(params: IPagination): Promise<any>
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
      find: async (params: IPagination) => {
        const items = await NotificationModel.aggregate([
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $facet: {
              metadata: [
                {
                  $count: 'total',
                },
                {
                  $addFields: {
                    page: params.page,
                  },
                },
              ],
              data: [
                {
                  $skip: (params.page - 1) * params.pageLength,
                },
                {
                  $limit: params.pageLength,
                },
                {
                  $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users',
                  },
                },
                { $unwind: '$users' },
                {
                  $project: {
                    title: 1,
                    body: 1,
                    dataInsert: {
                      $dateToString: {
                        format: '%d/%m/%Y %H:%M',
                        date: '$dateInsert',
                        timezone: '-0300',
                      },
                    },
                    'users.full_name': 1,
                  },
                },
              ], // add projection here wish you re-shape the docs
            },
          },
        ])

        return items
      },
    }
  }
