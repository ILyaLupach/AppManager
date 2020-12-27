import { Schema, model, Document } from 'mongoose'
import { UserType } from '../types'

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  acces: { type: String, default: 'read-only'}
})

const user = model<UserType & Document>('user', UserSchema)

export default user
