const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'A user must have a full name'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'A user must have a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
