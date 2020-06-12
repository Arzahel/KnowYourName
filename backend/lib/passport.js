const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const logger = require('../utils/logger');

const passportConfig = require('../config/passport.json');

const { user: userService } = require('../services/dal');

const strategy = new JwtStrategy(
  {
    secretOrKey: passportConfig.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (jwtPayload, next) => {
    try {
      const user = await userService.getById(jwtPayload.id);

      next(null, user);
    } catch (err) {
      logger.error(err, ['Authentication', 'JWT', 'JwtStrategy', `Payload: ${jwtPayload}`]);
      next(err, false);
    }
  },
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);

    done(null, user);
  } catch (err) {
    logger.error(err, ['Authentication', 'JWT', 'deserializeUser']);
    done(err, false);
  }
});

module.exports = strategy;
