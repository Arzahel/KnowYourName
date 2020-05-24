const models = require('../models');

const { person: personService } = require('../services/dal');
const logger = require('../utils/logger');

module.exports = {
  getById: async (req, res, next) => {
    const { id } = req.params;
    const query = {
      include: [
        {
          models: models.MovieCrew,
          as: 'crews',
          attributes: {
            exclude: ['personId', 'createdAt', 'updatedAt'],
          },
        },
        {
          models: models.MovieCast,
          as: 'casts',
          attributes: {
            exclude: ['personId', 'createdAt', 'updatedAt'],
          },
        },
      ],
    };

    try {
      const person = await personService.getById(id, query);

      return res.status(200).send(person || null);
    } catch (err) {
      logger.error(err, ['Controllers', 'Person', 'get', `Id: ${id}`]);

      return next(err);
    }
  },
};
