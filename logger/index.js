const winston = require('winston');

// Define log format
const logFormat = winston.format.printf(
  ({ level, message, timestamp }) =>
    `----------------------${timestamp} [${level.toUpperCase()}]: ${message}--------------------------------`
);

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set the logging level (e.g., 'info', 'debug', 'error')
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.Console(), // Output logs to the console
    // Add more transports as needed (e.g., to log to a file)
  ],
});

module.exports = logger;
