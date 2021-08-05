import { Document, Types } from 'mongoose'

export interface ICreate {
  employeeId: Types.ObjectId
  userId: Types.ObjectId
  serviceId: Types.ObjectId
  dataSchedule: Date
  time: String
}
