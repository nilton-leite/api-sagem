import { Sent } from '@src/utils/types/models/notification'
import { Document, Model, Schema, model, Types } from 'mongoose'

export interface INotification extends Document {
  title: String
  body: String
  userId: Types.ObjectId
  sent: Sent
}

interface INotifications extends Model<INotification> {}

const schema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true },
    sent: {
      type: {
        results: {
          type: [
            {
              messageId: { type: String, required: false },
            },
          ],
          required: false,
        },
        canonicalRegistrationTokenCount: { type: Number, required: false },
        failureCount: { type: Number, required: false },
        successCount: { type: Number, required: false },
        multicastId: { type: String, required: false },
      },
      required: false,
    },
  },
  { collection: 'notifications', timestamps: { createdAt: 'dateInsert' } }
)

const NotificationModel: INotifications = model<INotification, INotifications>(
  'notifications',
  schema
)
export default NotificationModel
