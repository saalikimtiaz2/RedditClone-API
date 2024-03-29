const dotEnv = require('dotenv');
const morgan = require('morgan');
const app = require('./app');
const log = require('./logger');
const establishDBConnection = require('./config/dbConnection');

dotEnv.config({ path: './.env' });

establishDBConnection();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ---------------------- server ----------------------

const port = process.env.PORT || 4001;

app.listen(port, () => {
  log.info(`Server connected Port ${port}`);
});
