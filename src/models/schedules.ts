import { Document, Model, Schema, model, Types } from 'mongoose'

export interface ISchedules extends Document {
  employeeId: Types.ObjectId
  userId: Types.ObjectId
  serviceId: Types.ObjectId
  dataSchedule: String
  time: String
}

interface ISchedulesModels extends Model<ISchedules> {}

const schema = new Schema(
  {
    employeeId: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
    serviceId: { type: Types.ObjectId, required: true },
    dataSchedule: { type: String, required: true },
    time: { type: String, required: true },
  },
  { collection: 'schedules', timestamps: { createdAt: 'dateInsert' } }
)

const SchedulesModel: ISchedulesModels = model<ISchedules, ISchedulesModels>(
  'schedules',
  schema
)
export default SchedulesModel
