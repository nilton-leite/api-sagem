import { Document, Model, Schema, model } from 'mongoose'

export interface IServices extends Document {
  title: string
  description: string
  price_default: Number
  execution_time_default: Number
  active: Boolean
  icon: string
}

interface IServicesModels extends Model<IServices> {}

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price_default: { type: Number, required: true },
    execution_time_default: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
    icon: { type: String, required: true },
  },
  { collection: 'services', timestamps: { createdAt: 'dateInsert' } }
)

const ServicesModel: IServicesModels = model<IServices, IServicesModels>(
  'services',
  schema
)
export default ServicesModel
