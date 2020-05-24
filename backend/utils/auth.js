const passport = require('passport');
const logger = require('../utils/logger');

module.exports = {
  needAuth: (req, res, next) => {
    passport.authenticate(
      'jwt',
      {
        session: false,
        failWithError: true,
      },
      (err, user) => {
        if (err) {
          logger.error(err, ['Utils', 'Auth', 'needAuth']);

          return next(err);
        }

        if (!user) {
          logger.error('Invalid token', ['Utils', 'Auth', 'needAuth']);

          return next({
            status: 403,
            message: 'Invalid token',
          });
        }

        return req.logIn(user, (error) => {
          if (error) {
            logger.error(error, ['Utils', 'Auth', 'needAuth']);

            return next(error);
          }

          return next();
        });
      },
    )(req, res, next);
  },
};
