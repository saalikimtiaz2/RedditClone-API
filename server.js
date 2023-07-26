// const app = require('./app');
// const morgan = require('morgan');
const dotEnv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const log = require('./logger');

const AppError = require('./utils/appError');
const globalErrorHanderer = require('./controllers/errorController');
const userRoute = require('./routes/user');
const postsRoutes = require('./routes/posts');

const app = express();

// -------------------- Middlewares --------------------

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/users', userRoute);
app.use('/api/posts', postsRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHanderer);

const establishDBConnection = require('./config/dbConnection');

dotEnv.config({ path: './.env' });

establishDBConnection();

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// ---------------------- server ----------------------

const port = process.env.PORT || 4001;

app.listen(port, () => {
  log.info(`Server connected Port ${port}`);
});
