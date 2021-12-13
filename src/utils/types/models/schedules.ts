import { Document, Types } from 'mongoose'

export interface ICreate {
  employeeId: Types.ObjectId
  userId: Types.ObjectId
  serviceId: Types.ObjectId
  dataSchedule: Date
  time: String
  price: Number
}
export interface IGet {
  userId: Types.ObjectId
  serviceId: Types.ObjectId
  employeeId: Types.ObjectId
  dataSchedule: Date
}

export interface IGetAllByDate {
  dataSchedule: Date
}

export interface IGetId {
  scheduleId: Types.ObjectId
  userId: Types.ObjectId
}
