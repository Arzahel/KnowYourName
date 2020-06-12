const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../utils/logger');
const passportConfig = require('../config/passport.json');

const { user: userService, profile: profileService } = require('../services/dal');

const generateToken = (userId) => {
  const payload = {
    id: userId,
  };

  return jwt.sign(payload, passportConfig.secret);
};

module.exports = {
  signIn: async (req, res, next) => {
    try {
      const user = await userService.findByEmail(req.body.email);

      if (!user) {
        return next({
          message: `Can not find user with email: ${req.body.email}`,
          status: 400,
        });
      }

      const result = await bcrypt.compare(req.body.password, user.password);

      if (result) {
        return res.status(200).send({
          message: 'ok',
          token: generateToken(user.id),
        });
      }

      return next({
        status: 400,
        message: 'Incorrect password',
      });
    } catch (err) {
      logger.warn(err, ['Controllers', 'User', 'SignIn', `Email: ${req.body.email}`]);

      return next(err);
    }
  },

  signUp: async (req, res, next) => {
    try {
      const user = await userService.findByEmail(req.body.email);

      if (user) {
        return next({
          message: `Account with email: ${req.body.email} already exist`,
          status: 400,
        });
      }
      // ProfileId to user
      const userData = {
        email: req.body.email,
        password: req.body.password,
      };
      const result = await userService.create(userData);

      if (result) {
        await profileService.create({ username: result.email, userId: result.id });

        return res.status(201).send({
          message: 'created',
        });
      }
    } catch (err) {
      logger.error(err, ['Controllers', 'User', 'SignUp', `Email: ${req.body.email}`]);

      return next(err);
    }
  },

  logout: (req, res) => {
    req.logout();
    res.status(200).send({
      message: 'ok',
    });
  },
};
