const models = require('../../models');
const scoreService = require('./score');

module.exports = {
  getOne: (options) => models.Episode.findOne(options),

  getCredits: (id) => {
    const options = {
      include: [
        {
          model: models.EpisodeCrew,
          as: 'crew',
        },
        {
          model: models.EpisodeGuest,
          as: 'guests',
        },
      ],
    };

    return models.Episode.findByPk(id, options);
  },

  getAllByOptions: (options) => models.Episode.findAll(options),

  addScore: async (scoreData) => {
    const t = await models.sequelize.transaction();

    await scoreService.episode.createOrUpdate(scoreData, t);

    const averageScore = await scoreService.episode.getAverageScore(scoreData.episodeId, t);

    await models.Episode.update(
      { averageScore },
      {
        where: {
          id: scoreData.episodeId,
        },
        transaction: t,
      },
    );

    await t.commit();
  },

  addComment: async (id, comment) => {
    const episode = await models.Episode.findByPk(id);

    await episode.addComment(comment);
  },

  createOrUpdate: async (data) => {
    if (data) {
      const episode = await models.Episode.findOne({
        where: {
          airDate: data.airDate,
          name: data.name,
          seasonId: data.seasonId,
        },
      });

      return episode ? episode.update(data) : models.Episode.create(data);
    }

    return null;
  },

  createCrew: async (data) => {
    if (data) {
      const result = await models.EpisodeCrew.findOne({
        where: { episodeId: data.episodeId, personId: data.personId },
      });

      return result ? models.EpisodeCrew.update(data) : models.EpisodeCrew.create(data);
    }

    return null;
  },

  createGuest: async (data) => {
    if (data) {
      const result = await models.EpisodeGuest.findOne({
        where: { episodeId: data.episodeId, personId: data.personId },
      });

      return result ? models.EpisodeGuest.update(data) : models.EpisodeGuest.create(data);
    }

    return null;
  },
};
