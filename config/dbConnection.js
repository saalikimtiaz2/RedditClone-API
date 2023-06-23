const mongoose = require('mongoose');
const log = require('../logger');

const connectDB = async () => {
  try {
    const dbLink =
      process.env.NODE_ENV === 'production'
        ? process.env.DB_URI
        : process.env.DB_LOCAL_URI;
    // connect to mongodb atlas
    await mongoose.connect(dbLink, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    log.info('Database Connected!');
  } catch (err) {
    log.error(err.message);
  }
};

module.exports = connectDB;
