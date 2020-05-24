const models = require('../../models');

module.exports = {
  getById: (id) => {
    const options = {
      attributes: {
        include: [[models.Sequelize.fn('count', models.Sequelize.col('episodes.id')), 'episodeCount']],
      },
      include: [
        {
          model: models.Episode,
          as: 'episodes',
          attributes: [],
        },
      ],
    };

    return models.Season.findByPk(id, options);
  },

  getAllBySerialId: (serialId) => {
    const options = {
      where: {
        serialId,
      },
      attributes: {
        include: [[models.Sequelize.fn('count', models.Sequelize.col('episodes.id')), 'episodeCount']],
        exclude: ['serialId'],
      },
      include: {
        model: models.Episode,
        as: 'episodes',
        attributes: [],
      },
      group: ['id'],
    };

    return models.Season.findAndCountAll(options);
  },

  createOrUpdate: async (data) => {
    if (data) {
      const season = await models.Season.findOne({
        where: {
          airDate: data.airDate,
          serialId: data.serialId,
        },
      });

      return season ? season.update(data) : models.Season.create(data);
    }

    return null;
  },
};
