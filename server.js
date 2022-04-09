require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const establishDBConnection = require("./config/dbConnection");
const apiRouter = require("./router");
const log = require("./logger");

// constants
const PORT = process.env.PORT || 5001;
// Initialize the application
const app = express();
// Initializing the middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors());
// Estavlish connection with DB
establishDBConnection();
// Router
app.use("/", apiRouter);
// Setup the server
app.listen(PORT, () => {
    log.info(`Server Running at Port ${PORT}`);
});
