const jwt = require('jsonwebtoken');
const { promisify } = require('util');
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

// ------------------------------- Protected Methods and Restricted Methods -------------------------------

exports.protect = catchAsync(async (req, res, next) => {
  // 1) get and check token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please login to get access', 401)
    );
  }

  // 2) verify token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
    () => {}
  );

  // 3) check if user is exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return new AppError('The user is no longer exist', 401);
  }

  // 4) check if user changed password after token issue
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return new AppError(
      'Usser recently changed password please login again',
      401
    );
  }

  // 5) GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("Your don't have permission to access this route", 403)
      );
    }
    next();
  };
