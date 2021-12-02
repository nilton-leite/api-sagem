import Container from '@src/configs/ioc'
import SchedulesModel from '@src/models/schedules'
import { ICreate, IGet, IGetId } from '@src/utils/types/models/schedules'
import { Document, Types, set } from 'mongoose'

export interface ISchedulesRepository {
  create(params: ICreate): Promise<any>
  getByDate(params: IGet): Promise<any>
  getById(params: IGetId): Promise<any>
  get(
    userId: Types.ObjectId,
    text: any,
    serviceId?: Types.ObjectId | null
  ): Promise<any>
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
    getById: async (params: IGetId) => {
      const item = await SchedulesModel.findOne({
        _id: params.scheduleId,
        userId: params.userId,
      })
      return item
    },
    get: async (
      userId: Types.ObjectId,
      text: String | null,
      serviceId: Types.ObjectId
    ) => {
      let filter: any = {}
      if (text) {
        filter = {
          'employees.full_name': {
            $regex: new RegExp(`.*${text}.*`, 'i'),
          },
        }
      }
      if (serviceId) {
        filter.serviceId = serviceId
      }

      const item = await SchedulesModel.aggregate([
        { $match: { userId } },
        {
          $lookup: {
            from: 'employees',
            localField: 'employeeId',
            foreignField: '_id',
            as: 'employees',
          },
        },
        { $unwind: '$employees' },
        {
          $lookup: {
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'services',
          },
        },
        { $unwind: '$services' },
        {
          $match: { $or: [filter] },
        },
        {
          $project: {
            _id: 1,
            dataSchedule: 1,
            time: 1,
            price: 1,
            'employees._id': 1,
            'employees.full_name': 1,
            'employees.cpf': 1,
            'employees.telephone': 1,
            'employees.email': 1,
            'employees.description': 1,
            'services.title': 1,
            'services.description': 1,
            'services.icon': 1,
          },
        },
      ])
      return item
    },
  }
}
