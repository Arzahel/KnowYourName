const { Op } = require('sequelize');

const logger = require('../utils/logger');
const pagination = require('../utils/pagination');
const { serial: serialOptions } = require('../utils/dbOptions');

const { serial: serialService, season: seasonService, favorite: favoriteService } = require('../services/dal');

module.exports = {
  getShortInfo: async (req, res, next) => {
    const options = {
      include: [serialOptions.genre()],
    };

    try {
      const serial = await serialService.getById(req.params.id, options);

      res.status(200).send(serial);
    } catch (err) {
      logger.error(err, ['Controller', 'Serial', 'getShortInfo', `Id: ${req.params.id}`]);
      next(err);
    }
  },

  getDetails: async (req, res, next) => {
    const options = {
      include: [serialOptions.genre(), serialOptions.seasons(), serialOptions.creators()],
    };

    try {
      const serial = await serialService.getById(req.params.id, options);

      res.status(200).send(serial);
    } catch (err) {
      logger.error(err, ['Controller', 'Serial', 'getDetails', `Id: ${req.params.id}`]);
      next(err);
    }
  },

  getByPage: async (req, res, next) => {
    const { page, limit } = req.query;
    const options = pagination.getPageOptions(page, limit);

    options.include = [serialOptions.genre()];

    try {
      const { count, rows: serials } = await serialService.findAndCountAll(options);

      res.set('x-total-count', count);
      res.send(serials || []);
    } catch (err) {
      logger.error(err, ['Controller', 'Serial', 'getByPage', `Page: ${page} Limit: ${limit}`]);
      next(err);
    }
  },

  getByGenre: async (req, res, next) => {
    const { page, limit } = req.query;
    const options = pagination.getPageOptions(page, limit);

    options.include = [serialOptions.genre()];
    options.include[0].where = {
      name: req.params.genre,
    };
    try {
      const { count, rows: serials } = await serialService.findAndCountAll(options);

      res.set('x-total-count', count);
      res.send(serials || []);
    } catch (err) {
      logger.error(err, [
        'Controller',
        'Serial',
        'getByGenre',
        `Genre: ${req.params.genre}, Page: ${page} Limit: ${limit}`,
      ]);
      next(err);
    }
  },

  getSeasons: async (req, res, next) => {
    try {
      const result = await seasonService.getAllBySerialId(req.params.id);

      res.set('x-total-count', result.count || 0);
      res.send(result.rows || []);
    } catch (err) {
      logger.error(err, ['Controller', 'Serial', 'getSerialSeasons', `Serial id: ${req.param.id}`]);

      next(err);
    }
  },

  getSeasonInfo: async(req,res,next) => {
    try {
      const season = await seasonService.getById(req.params.seasonId);

      res.send(season || {});
    } catch (err) {
      logger.error(err, ['Controller', 'Serial', 'getSeasonInfo', `Season id: ${req.params.seasonId}`]);

      next(err);
    }
  },

  // Comment
  addComment: async (req, res, next) => {
    try {
      await serialService.addComment(req.params.id, req.comment);
      res.send(req.comment);
    } catch (err) {
      logger.error(err, ['Controller', 'Serial', 'addComment', `Serial id: ${req.params.id}, User id ${req.user.id}`]);
      next(err);
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
    const searchOptions = {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: {
        name: {
          [Op.substring]: searchQuery,
        },
      },
      include: [serialOptions.genre()],
    };
    const { limit, page } = req.body;
    const options = pagination.getPageOptions(page, limit, searchOptions);

    try {
      const { count, rows } = await serialService.findAndCountAll(options);

      res.set('x-page-count', count);

      res.status(200).send(rows || []);
    } catch (err) {
      logger.error(err, ['Controller', 'Serial', 'search']);

      next(err);
    }
  },

  rate: async (req, res, next) => {
    const serialId = req.params.id;
    const data = {
      userId: req.user.id,
      serialId,
      value: req.body.value,
    };

    try {
      await serialService.addScore(serialId, data);

      return res.status(200).send({ message: 'ok' });
    } catch (err) {
      logger.error(err, ['Controller', 'Serial', 'rate', `Score data: ${data}`]);

      return next(err);
    }
  },

  addToFavorite: async (req, res, next) => {
    const data = {
      userId: req.user.id,
      serialId: req.params.id,
    };

    try {
      await favoriteService.addSerial(data);

      res.status(200).send({ message: 'ok' });
    } catch (err) {
      logger.error(err, [
        'Controllers',
        'Serial',
        'addToFavorite',
        `User id: ${data.userId}, Serial id: ${data.serialId}`,
      ]);

      next(err);
    }
  },

  removeFromFavorite: async (req, res, next) => {
    const data = {
      userId: req.user.id,
      serialId: req.params.id,
    };

    try {
      await favoriteService.removeSerial(data);

      res.status(200).send({ message: 'ok' });
    } catch (err) {
      logger.error(err, [
        'Controllers',
        'Serial',
        'removeFromFavorite',
        `User id: ${data.userId}, Serial id: ${data.serialId}`,
      ]);

      next(err);
    }
  },
};
