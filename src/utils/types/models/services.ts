import { Types } from 'mongoose'

export interface ICreate {
  title: string
  description: string
  price: string
  interval_time: string
  employees: Object[]
  active: Boolean
}
export interface IFindById {
  _id: Types.ObjectId
  active: Boolean
}
