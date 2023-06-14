const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide a username'],
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please provide your email'],
    validators: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default:
      'https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Please provide a password'],
    minLength: [8, 'A password must be at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this validation only applies when we use SAVE or CREATE.
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  // only run this func()
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// this instance compares the password against the current password.
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
