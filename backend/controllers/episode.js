const logger = require('../utils/logger');
const { episode: episodeInclude } = require('../utils/dbOptions');

const {
  episode: episodeService,
} = require('../services/dal');

module.exports = {
  getById: async (req, res, next) => {
    const options = {
      include: [episodeInclude.crew(), episodeInclude.guests()],
      where: {
        seasonId: req.params.seasonId,
        id: req.params.episodeId,
      },
    };

    try {
      const serial = await episodeService.getOne(options);

      res.status(200).send(serial);
    } catch (err) {
      logger.error(err, [
        'Controller',
        'Episode',
        'getById',
        `Season id: ${req.params.seasonId}, Episode number: ${req.params.episodeNumber}`,
      ]);
      next(err);
    }
  },

  getSeasonEpisodes: async (req,res,next) => {
    // ? Move to service getAllBySeasonId
    const options = {
      where: {
        seasonId: req.params.seasonId,
      },
    };

    try {
      const episodes = await episodeService.getAllByOptions(options);

      res.send(episodes || []);
    } catch(err) {
      logger.error(err, [
        'Controller',
        'Episode',
        'getSeasonEpisodes',
        `Season id: ${req.params.seasonId}`,
      ]);
    }
  },

  // Comment
  addComment: async (req, res, next) => {
    try {
      await episodeService.addComment(req.params.episodeId, req.comment);

      res.send(req.comment);
    } catch (err) {
      logger.error(err, [
        'Controller',
        'Episode',
        'addComment',
        `Serial id: ${req.params.id}, Episode id: ${req.params.episodeId} User id: ${req.user.id}`,
      ]);
      next(err);
    }
  },

  rate: async (req, res, next) => {
    const episodeId = req.params.episodeId;
    const data = {
      userId: req.user.id,
      episodeId,
      value: req.body.value,
    };

    try {
      await episodeService.addScore(data);

      return res.status(200).send({ message: 'ok' });
    } catch (err) {
      logger.error(err, [
        'Controller',
        'Episode',
        'rate',
        `Episode id: ${episodeId}, User id: ${req.user.id}, Score data: ${data}`,
      ]);

      return next(err);
    }
  },
};
