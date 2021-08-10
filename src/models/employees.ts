import { Document, Model, Schema, model, Types } from 'mongoose'

export interface IEmployees extends Document {
  full_name: String
  cpf: String
  telephone: String
  email: String
  description: String
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

interface IEmployeesModels extends Model<IEmployees> {}

const schema = new Schema(
  {
    full_name: { type: String, required: true },
    cpf: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: false },
    start_morning_time: { type: String, required: false },
    end_morning_time: { type: String, required: false },
    start_afternoon_time: { type: String, required: false },
    end_afternoon_time: { type: String, required: false },
    active: { type: Boolean, required: true, default: true },
    services: [
      {
        serviceId: {
          type: Schema.Types.ObjectId,
          ref: 'employees',
          required: false,
        },
        price: { type: Number, required: false },
        execution_time: { type: Number, required: false },
      },
    ],
  },
  { collection: 'employees', timestamps: { createdAt: 'dateInsert' } }
)

const EmployeesModel: IEmployeesModels = model<IEmployees, IEmployeesModels>(
  'employees',
  schema
)
export default EmployeesModel
