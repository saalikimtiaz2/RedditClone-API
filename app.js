const express = require('express');

const userRoute = require('./routes/user');

const app = express();

// -------------------- Middlewares --------------------

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/users', userRoute);

module.exports = app;
