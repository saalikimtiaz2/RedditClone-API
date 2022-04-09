const mongoose = require("mongoose");
const log = require("../logger");

const connectDB = async () => {
    try {
        // connect to mongodb atlas
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        log.info("Database Connected!");
    } catch (err) {
        log.error(err.message);
    }
};

module.exports = connectDB;
