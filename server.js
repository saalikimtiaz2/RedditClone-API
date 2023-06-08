/* eslint-disable import/no-extraneous-dependencies */
const dotEnv = require('dotenv');
const morgan = require('morgan');
const app = require('./app');
const establishDBConnection = require('./config/dbConnection');

dotEnv.config({ path: './.env' });

establishDBConnection();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ---------------------- server ----------------------

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Server connected Port ${port}...`);
});
