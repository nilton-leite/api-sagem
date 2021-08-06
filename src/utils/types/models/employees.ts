import { Types } from 'mongoose'
export interface ICreate {
  full_name: string
  cpf: string
  telephone: string
  email: string
  description: string
  start_time: string
  end_time: string
  active: boolean
}

export interface IFindById {
  _id: Types.ObjectId
}
