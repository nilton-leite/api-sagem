import { Document, Model, Schema, model } from 'mongoose'

export interface IServices extends Document {
  title: string
  description: string
  price: string
  interval_time: string
  employees: Object[]
  active: Boolean
}

interface IServicesModels extends Model<IServices> {}

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    interval_time: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'employees',
      },
    ],
  },
  { collection: 'services', timestamps: { createdAt: 'dateInsert' } }
)

const ServicesModel: IServicesModels = model<IServices, IServicesModels>(
  'services',
  schema
)
export default ServicesModel
