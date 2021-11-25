import { Document, Types } from 'mongoose'

export interface ICreate {
  employeeId: Types.ObjectId
  userId: Types.ObjectId
  serviceId: Types.ObjectId
  dataSchedule: String
  time: String
}
export interface IGet {
  userId: Types.ObjectId
  serviceId: Types.ObjectId
  employeeId: Types.ObjectId
  dataSchedule: String
}
