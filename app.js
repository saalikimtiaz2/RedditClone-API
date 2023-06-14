const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHanderer = require('./controllers/errorController');
const userRoute = require('./routes/user');

const app = express();

// -------------------- Middlewares --------------------

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/users', userRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHanderer);

module.exports = app;
