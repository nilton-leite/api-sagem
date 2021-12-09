import { number } from 'fp-ts'
import { Types } from 'mongoose'

export interface NotificationOptions {
  priority: string
  timeToLive: number
}

export interface Results {
  messageId: String
}
export interface Sent {
  results: Results[]
  canonicalRegistrationTokenCount: number
  failureCount: number
  successCount: number
  multicastId: string
}
export interface ICreate {
  title: string
  body: string
  userId: Types.ObjectId
  sent: Sent
}
