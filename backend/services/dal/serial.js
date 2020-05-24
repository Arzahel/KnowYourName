const models = require('../../models');
const scoreService = require('./score');

module.exports = {
  getById: (id, options) => models.Serial.findByPk(id, options),

  findAndCountAll: async (options) => {
    if (!options) {
      return null;
    }

    const query = options;

    query.distinct = true;

    return models.Serial.findAndCountAll(query);
  },

  getPopular: (limit = 10) => {
    return models.Serial.findAll({
      attributes: {
        include: [[models.Sequelize.fn('count', models.Sequelize.col('scores.id')), 'countOfRatings']],
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: models.SerialScore,
        as: 'scores',
        attributes: [],
        duplicating: false,
      },
      group: ['serial.id'],
      order: [[models.Sequelize.col('countOfRatings'), 'DESC']],
      limit,
    });
  },

  addScore: async (id, scoreData) => {
    const t = await models.sequelize.transaction();

    await scoreService.serial.createOrUpdate(scoreData, t);
    const averageScore = await scoreService.serial.getAverageScore(id, t);

    await models.Serial.update(
      { averageScore },
      {
        where: {
          id,
        },
        transaction: t,
      },
    );

    await t.commit();
  },

  addComment: async (id, comment) => {
    const serial = await models.Serial.findByPk(id);

    await serial.addComment(comment);
  },

  createOrUpdate: async (data) => {
    if (data) {
      const serial = await models.Serial.findOne({
        where: {
          firstAirDate: data.firstAirDate,
          name: data.name,
          lastAirDate: data.lastAirDate,
        },
      });

      return serial ? serial.update(data) : models.Serial.create(data);
    }

    return null;
  },

  createCreator: async (data) => {
    if (data) {
      const result = await models.SerialCreator.findOne({
        where: { serialId: data.serialId, personId: data.personId },
      });

      return result ? models.SerialCreator.update(data) : models.SerialCreator.create(data);
    }

    return null;
  },
};
