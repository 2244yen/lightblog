const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'Username này đã tồn tại trong hệ thống!'],
    required: [true, 'Username không được để trống!']
  },
  email: {
    type: String,
    unique: [true, 'Email này đã tồn tại trong hệ thống!']
  },
  password: {
    type: String
  },
  name: String,
  biography: String,
  picture: String,
  created: { 
    type: Date,
    default: Date.now
  }
}, { collection: 'users' })

UserSchema.methods.create = function (data) {
  this.username = data.username
  this.email = data.email
  this.password = data.password
}

module.exports = mongoose.model('User', UserSchema)