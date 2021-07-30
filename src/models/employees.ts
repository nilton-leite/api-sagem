import { ICreate } from '@src/utils/types/users'
import { Document, Model, Schema, model } from 'mongoose'

export interface IEmployees extends Document {
  full_name: String
  cpf: String
  telephone: String
  email: String
  available_services?: Object[]
}

interface IEmployeesModels extends Model<IEmployees> {}

const schema = new Schema(
  {
    full_name: { type: String, required: true },
    cpf: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    available_services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'services',
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
