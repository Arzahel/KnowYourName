const models = require('../models');
const logger = require('../utils/logger');

const { comment: commentService } = require('../services/dal');

module.exports = {
  create: async (req, res, next) => {
    const { text, parentId } = req.body;

    if (!text.trim()) {
      next({ status: 400, message: `Text field is required` });

      return;
    }
    try {
      req.comment = await commentService.create({ parentId, userId: req.user.id, text });
      next();
    } catch (err) {
      logger.error(err, ['Controllers', 'Comment', 'create', `User id: ${req.user.id}, Text: ${text}`]);
      next(err);
    }
  },

  update: async (req, res, next) => {
    const { text, commentId } = req.body;

    if (!text || !text.trim()) {
      next({ status: 400, message: `Text field is required` });

      return;
    }
    try {
      await commentService.updateById(commentId, req.user.id, { text });

      res.send({ message: 'ok' });
    } catch (err) {
      logger.error(err, [
        'Controller',
        'Comment',
        'update',
        `Text: ${text}, User id ${req.user.id}, Comment id: ${commentId}`,
      ]);
      next(err);
    }
  },

  remove: async (req, res, next) => {
    const commentId = req.body.commentId;

    if (!commentId) {
      next({
        status: 400,
        message: `CommentId field is required`,
      });

      return;
    }
    try {
      await commentService.remove({ where: { id: commentId, userId: req.user.id } });
      res.status(200).send({
        message: 'ok',
      });
    } catch (err) {
      logger.error(err, [
        'Controller',
        'Comment',
        'remove',
        `User id ${req.user.id}, Comment id: ${commentId}`,
      ]);
    }
  },
  // TODO refactor
  getMovieComments: async (req, res, next) => {
    const movieId = req.params.id;

    try {
      const comments = await commentService.getByMovieId(movieId);

      res.set('X-Total-Count', comments.length);

      res.status(200).send(comments);
    } catch (err) {
      logger.error(err, ['Controllers', 'Comment', 'getMovieComments', `Movie id: ${movieId}`]);

      next(err);
    }
  },
  // TODO refactor
  getSerialComments: async(req,res,next) => {
    try {
      const comments = await commentService.getBySerialId(req.params.id);

      res.set('X-Total-Count', comments.length);

      res.status(200).send(comments);
    } catch (err) {
      logger.error(err, ['Controllers', 'Comment', 'getSerialComments', `Serial id: ${req.params.id}`]);

      next(err);
    }
  },
  // TODO refactor
  getEpisodeComments: async(req,res,next) => {
    try {
      const comments = await commentService.getByEpisodeId(req.params.episodeId);

      res.set('X-Total-Count', comments.length);

      res.status(200).send(comments);
    } catch (err) {
      logger.error(err, ['Controllers', 'Comment', 'getEpisodeComments', `Serial id: ${req.params.id}`]);

      next(err);
    }
  },

  getUserComments: async (req, res, next) => {
    const userId = req.user.id;
    const query = {
      where: {
        userId,
      },
      attributes: {
        include: [[models.Sequelize.col('movies.title'), 'movieTitle'],
                  [models.Sequelize.col('movies.id'), 'movieId']],
      },
      include: {
        model: models.Movie,
        as: 'movies',
        attributes: [],
      },
    };

    try {
      const comments = await commentService.getAllByOptions(query);

      res.set('X-TOTAL-COUNT', comments.length);

      return res.status(200).send(comments);
    } catch (err) {
      logger.error(err, ['Controllers', 'Comment', 'getUserComments']);

      return next(err);
    }
  },
};
