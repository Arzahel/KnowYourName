const { profile: profileService, score: scoreService, favorite: favoriteService } = require('../services/dal');

const pagination = require('../utils/pagination');
const logger = require('../utils/logger');

module.exports = {
  update: async (req, res, next) => {
    let profileData = {};

    try {
      profileData = JSON.parse(JSON.stringify(req.body));

      await profileService.update(req.user.id, profileData);

      const profile = await profileService.getByUserId(req.user.id);

      return res.status(201).send(profile || null);
    } catch (err) {
      logger.error(err, ['Controllers', 'Profile', 'update', `User id: ${req.user.id}, data: ${profileData}`]);

      return next(err);
    }
  },

  get: async (req, res, next) => {
    try {
      const profile = await profileService.getByUserId(req.user.id);

      return res.status(200).send(profile || null);
    } catch (err) {
      logger.error(err, ['Controllers', 'Profile', 'get', `User id: ${req.user.id}`]);

      return next(err);
    }
  },

  getMovieScores: async (req, res, next) => {
    const { page, limit } = req.query;

    try {
      const options = pagination.getPageOptions(page, limit, { where: { userId: req.user.id } });
      const { count, rows } = await scoreService.movie.getByOptions(options);

      res.set('x-total-count', count);
      res.status(200).send(rows);
    } catch (err) {
      logger.error(err, ['Controllers', 'Profile', 'getMovieScores', `User id: ${req.user.id}`]);

      return next(err);
    }
  },

  getFavorites: async (req, res, next) => {
    try {
      const { count, rows: favorites } = await favoriteService.getFavoritesByUserId(req.user.id);

      res.set('X-TOTAL-COUNT', count);

      return res.status(200).send(favorites || []);
    } catch (err) {
      logger.error(err, ['Controllers', 'Profile', 'getFavorites', `User id: ${req.user.id}`]);

      return next(err);
    }
  },

  removeFavorite: async (req, res, next) => {
    const { movieId } = req.body;

    if (!movieId) {
      return next({ status: 400, message: 'MovieId is required' });
    }
    try {
      await favoriteService.removeMovie(req.user.id, +movieId);

      return res.status(200).send({ message: 'ok' });
    } catch (err) {
      logger.error(err, [
        'Controllers',
        'Profile',
        'removeFavorite',
        `Data: movieId ${movieId}, userId: ${req.user.id}`,
      ]);

      return next(err);
    }
  },
};
