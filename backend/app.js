const http = require('http');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const strategy = require('./lib/passport');
const logger = require('./utils/logger');
const indexRouter = require('./routes/index');

const Sequelize = require("sequelize");
const sequelize = new Sequelize("sql7348282", "sql7348282", "lmVQLUqmkr", {
  dialect: "mysql",
  host: "sql7.freemysqlhosting.net",
  port: "3306"
});

const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
  });

const Profile = sequelize.define("profile", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    achievmentsStatus: {
      type: Sequelize.JSON,
      allowNull: false
    },
    progressStatus: {
        type: Sequelize.JSON,
        allowNull: false
    }
  });

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (!port) {
    return val;
  }
  if (port >= 0) {
    return port;
  }

  return false;
};

const app = express();

app.use(cors({
  exposedHeaders: ['X-Page-Count', 'X-Total-Count'],
}));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

passport.use('jwt', strategy);
app.use(passport.initialize());

app.use((req, res, next) => {
  logger.log('info', `${req.method} ${req.path}`, ['app']);
  next();
});

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  logger.error(`Status: ${err.status || 500} Message: ${err.message}`, ['app', 'Error handler']);
  res.status(err.status || 500).send({
    error: err.message,
  });
});

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server started at ${server.address().address}:${port}`);
});

module.exports = app;
