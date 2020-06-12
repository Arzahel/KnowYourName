const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({
      stack: true,
    }),
    format.colorize(),
    format.simple(),
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
    }),
    // new transports.File({
    //   filename: 'error.log',
    //   level: 'error',
    // }),
  ],
});

module.exports = logger;
