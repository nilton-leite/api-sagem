import { Types } from 'mongoose'

export interface ICreate {
  title: string
  description: string
  price_default: Number
  execution_time_default: Number
  active: Boolean
  icon: string
}
export interface IFindById {
  _id: Types.ObjectId
  active: Boolean
}
