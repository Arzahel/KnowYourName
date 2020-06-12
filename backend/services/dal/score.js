const { MovieScore, Sequelize, SerialScore, EpisodeScore } = require('../../models');

/**
 * @typedef MovieScore
 * @property {Number} userId
 * @property {Number} movieId
 * @property {Number} value
 */

module.exports = {

  /**
   * @summary
   */
  movie: {
    getByOptions: (options) => MovieScore.findAndCountAll(options),

    /**
     * @param {MovieScore} data
     * @param {Number} transaction
     * @returns {MovieScore} movieScore
     */
    createOrUpdate: async (data, transaction) => {
      const movieScore = await MovieScore.findOne({
        where: {
          userId: data.userId,
          movieId: data.movieId,
        },
        transaction,
      });

      return movieScore ? movieScore.update(data, { transaction }) : MovieScore.create(data, { transaction });
    },

    /**
     * @param {Number} movieId
     * @param {Number} transaction
     * @returns {Number} movie average score
     */
    getAverageScore: async (movieId, transaction) => {
      const data = await MovieScore.findOne({
        where: {
          movieId,
        },
        attributes: ['movieId', [Sequelize.fn('AVG', Sequelize.col('value')), 'avgScore']],
        group: ['movieId'],
        transaction,
      });

      return data.dataValues.avgScore;
    },
  },

  serial: {
    getAverageScore: async (serialId, transaction) => {
      const data = await SerialScore.findOne({
        where: {
          serialId,
        },
        attributes: ['serialId', [Sequelize.fn('AVG', Sequelize.col('value')), 'avgScore']],
        group: ['serialId'],
        transaction,
      });

      return data.dataValues.avgScore;
    },

    createOrUpdate: async (data, transaction) => {
      const serialScore = await SerialScore.findOne({
        where: {
          userId: data.userId,
          serialId: data.serialId,
        },
        transaction,
      });

      return serialScore ? serialScore.update(data, { transaction }) : SerialScore.create(data, { transaction });
    },
  },

  episode: {
    getAverageScore: async (episodeId, transaction) => {
      const data = await EpisodeScore.findOne({
        where: {
          episodeId,
        },
        attributes: ['episodeId', [Sequelize.fn('AVG', Sequelize.col('value')), 'avgScore']],
        group: ['episodeId'],
        transaction,
      });

      return data.dataValues.avgScore;
    },

    createOrUpdate: async (data, transaction) => {
      const episodeScore = await EpisodeScore.findOne({
        where: {
          userId: data.userId,
          episodeId: data.episodeId,
        },
        transaction,
      });

      return episodeScore ? episodeScore.update(data, { transaction }) : EpisodeScore.create(data, { transaction });
    },
  },
};
