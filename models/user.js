const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  acces: { type: String, default: 'read-only'}
})

const user = model('user', UserSchema)

module.exports = user
