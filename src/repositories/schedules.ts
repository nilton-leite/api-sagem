import Container from '@src/configs/ioc'
import SchedulesModel from '@src/models/schedules'
import {
  ICreate,
  IGet,
  IGetAllByDate,
  IGetId,
} from '@src/utils/types/models/schedules'
import moment from 'moment'
import { Document, Types, set } from 'mongoose'

export interface ISchedulesRepository {
  create(params: ICreate): Promise<any>
  cancel(scheduleId: Types.ObjectId, userId: Types.ObjectId): Promise<any>
  getByCancel(params: IGetAllByDate): Promise<any>
  getAllByDate(params: IGetAllByDate): Promise<any>
  getByDate(params: IGet): Promise<any>
  getById(params: IGetId): Promise<any>
  get(
    userId: Types.ObjectId,
    text: any,
    serviceId?: Types.ObjectId | null,
    cancel?: Boolean | null
  ): Promise<any>
}

export const SchedulesRepository = ({}: Container): ISchedulesRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await SchedulesModel.create(params)
      return item
    },
    cancel: async (scheduleId: Types.ObjectId, userId: Types.ObjectId) => {
      let date = moment(new Date(), 'DD-MM-YYYY')
      let currentDate = moment(date).format('YYYY-MM-DD')
      const item = await SchedulesModel.updateOne(
        { _id: scheduleId, userId },
        { $set: { canceled: true, canceledAt: new Date(currentDate) } }
      )
      return item
    },
    getAllByDate: async (params: IGetAllByDate) => {
      const item = await SchedulesModel.aggregate([
        {
          $match: {
            dataSchedule: params.dataSchedule,
            canceled: false,
            confirmed: false,
          },
        },
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
          $project: {
            _id: 1,
            userId: 1,
            dataSchedule: 1,
            time: 1,
            price: 1,
            'employees._id': 1,
            'employees.full_name': 1,
            'employees.cpf': 1,
            'employees.telephone': 1,
            'employees.email': 1,
            'employees.description': 1,
            'services._id': 1,
            'services.title': 1,
            'services.description': 1,
            'services.icon': 1,
          },
        },
      ])
      return item
    },
    getByCancel: async (params: IGetAllByDate) => {
      const item = await SchedulesModel.aggregate([
        {
          $match: {
            dataSchedule: { $lt: params.dataSchedule },
            confirmed: false,
            canceled: false,
          },
        },
        {
          $project: {
            _id: 1,
            dataSchedule: {
              $dateToString: { format: '%d/%m/%Y', date: '$dataSchedule' },
            },
            userId: 1,
            time: 1,
            price: 1,
          },
        },
      ])
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
      serviceId: Types.ObjectId,
      cancel: Boolean | null
    ) => {
      let filter: any = {}
      let match: any = { userId: userId }
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

      if (cancel) {
        match.canceled = false
      }

      const item = await SchedulesModel.aggregate([
        { $match: match },
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
            dataSchedule: {
              $dateToString: { format: '%d/%m/%Y', date: '$dataSchedule' },
            },
            time: 1,
            price: 1,
            confirmed: 1,
            canceled: 1,
            'employees._id': 1,
            'employees.full_name': 1,
            'employees.cpf': 1,
            'employees.telephone': 1,
            'employees.email': 1,
            'employees.description': 1,
            'services._id': 1,
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
