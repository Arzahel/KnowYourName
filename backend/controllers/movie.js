const models = require('../models');
const logger = require('../utils/logger');
const pagination = require('../utils/pagination');

const { movie: movieService, favorite: favoriteService } = require('../services/dal');

const getMoviesByPage = async (page, limit, additionalOptions = {}) => {
  const options = pagination.getPageOptions(page, limit, additionalOptions);

  try {
    const { count, rows: movies } = await movieService.findAndCountAll(options);

    if (movies) {
      const result = pagination.getResponsePageInfo(count, limit, page);

      result.movies = movies;

      return result;
    }

    return null;
  } catch (err) {
    logger.error(err, ['Movie controller', 'GetMovieByPage', `Options: ${options}`]);

    return null;
  }
};

module.exports = {
  getById: async (req, res, next) => {
    const id = req.params.id;

    try {
      const movie = await movieService.getById(id, true);

      return res.status(200).send(movie || null);
    } catch (err) {
      logger.error(err, ['Controller', 'Movie', 'GetById', `Id: ${id}`]);

      return next(err);
    }
  },

  search: async (req, res, next) => {
    const searchQuery = req.query.q.trim();

    if (!searchQuery.length) {
      return next({
        status: 400,
        message: "Search query 'q' is required",
      });
    }
    const options = {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: {
        title: {
          [models.Sequelize.Op.substring]: searchQuery,
        },
      },
    };

    try {
      const result = await getMoviesByPage(req.query.page, req.query.limit, options);

      res.set('X-Total-Count', result.results);
      res.set('X-Page-Count', result.pages);

      return res.status(200).send(result.movies || []);
    } catch (err) {
      logger.error(err, ['Controller', 'Movie', 'Search', `Search query: ${options}`]);

      return next(err);
    }
  },

  getByGenre: async (req, res, next) => {
    const options = {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: models.Genre,
          as: 'genres',
          attributes: [],
          where: {
            name: req.params.genre,
          },
        },
      ],
    };

    try {
      const result = await getMoviesByPage(req.query.page, req.query.limit, options);

      res.set('X-Total-Count', result.results);
      res.set('X-Page-Count', result.pages);

      return res.status(200).send(result.movies || []);
    } catch (err) {
      logger.error(err, ['Controller', 'Movie', 'getByGenre', `Genre name: ${req.params.genre}`]);

      return next(err);
    }
  },

  getGenres: async (req, res, next) => {
    try {
      const genres = await movieService.getGenres();

      return res.status(200).send(genres || []);
    } catch (err) {
      logger.error(err, ['Controller', 'Movie', 'getGenres']);

      return next(err);
    }
  },

  getByPage: async (req, res, next) => {
    try {
      const result = await getMoviesByPage(req.query.page, req.query.limit);

      res.set('X-Total-Count', result.results);
      res.set('X-Page-Count', result.pages);

      return res.status(200).send(result.movies || []);
    } catch (err) {
      logger.error(err, ['Controller', 'Movie', 'getByPage']);

      return next(err);
    }
  },

  getCredits: async (req, res, next) => {
    const movieId = req.params.id;

    try {
      const credits = await movieService.getCredits(movieId);

      return res.status(200).send(credits || []);
    } catch (err) {
      logger.error(err, ['Controller', 'Movie', 'getCredits', `Movie id: ${movieId}`]);

      return next(err);
    }
  },

  rate: async (req, res, next) => {
    const movieId = req.params.id;
    const data = {
      userId: req.user.id,
      movieId,
      value: req.body.value,
    };

    try {
      await movieService.addScore(movieId, data);

      return res.status(200).send({ message: 'ok' });
    } catch (err) {
      logger.error(err, ['Controller', 'Movie', 'rate', `Score data: ${data}`]);

      return next(err);
    }
  },

  addToFavorite: async (req, res, next) => {
    const userId = req.user.id;
    const movieId = req.params.id;

    try {
      await favoriteService.addMovie({ userId, movieId });

      return res.status(200).send({ message: 'ok' });
    } catch (err) {
      logger.error(err, ['Controllers', 'Movie', 'addToFavorite', `Body: ${userId}`]);

      return next(err);
    }
  },

  removeFromFavorite: async (req, res, next) => {
    const userId = req.user.id;
    const movieId = req.params.id;

    try {
      await favoriteService.removeMovie({ userId, movieId });

      return res.status(200).send({ message: 'ok' });
    } catch (err) {
      logger.error(err, ['Controllers', 'Movie', 'removeFromFavorite', `User id: ${userId} Movie id: ${movieId}`]);

      return next(err);
    }
  },

  getPopular: async (req, res, next) => {
    const limit = +req.query.limit;

    try {
      const data = await movieService.getPopular(limit);

      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  },
};
