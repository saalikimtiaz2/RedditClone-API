const jwt = require('jsonwebtoken');
const User = require('../model/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Method => POST
// Route => /users/signup
// Description =>  Authenticate new user.
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser },
  });
});

// Method => POST
// Route => /users/login
// Description =>  Authenticate already registered user.
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if the email/password exists
    if (!email || !password) {
      return next(new AppError('Please provide an email and password', 400));
    }

    // 2) Check if the user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything is Okay, send token to client
    const token = signToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
    });
  } catch (err) {
    return next(new AppError(err.message, 401));
  }
};
