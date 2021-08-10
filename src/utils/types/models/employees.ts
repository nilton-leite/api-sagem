import { Types } from 'mongoose'
export interface ICreate {
  full_name: string
  cpf: string
  telephone: string
  email: string
  description: string
  start_morning_time: string
  end_morning_time: string
  start_afternoon_time: string
  end_afternoon_time: string
  active: boolean
  services: {
    serviceId: ReturnType<typeof Types.ObjectId>
    price: Number
    execution_time: Number
  }[]
}

export interface IFindById {
  _id: Types.ObjectId
}
