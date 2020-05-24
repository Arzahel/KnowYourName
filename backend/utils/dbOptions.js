const models = require('../models');

module.exports = {
  serial: {
    genre: ({ where, attributes } = {}) => ({
      model: models.Genre,
      as: 'genres',
      attributes: attributes || ['id', 'name'],
      where,
      through: {
        attributes: [],
      },
    }),
    creators: ({ where, attributes } = {}) => ({
      model: models.Person,
      as: 'creators',
      where,
      attributes,
      through: {
        attributes: [],
      },
    }),

    seasons: ({ where, attributes } = {}) => ({
      model: models.Season,
      as: 'seasons',
      where,
      attributes: attributes || {
        exclude: ['serialId'],
      },
    }),

    comments: ({ where, attributes } = {}) => ({
      model: models.Comment,
      as: 'comments',
      where: where,
      attributes: attributes || { exclude: ['serialId'] },
      through: {
        attributes: [],
      },
    }),
  },

  episode: {
    guests: ({ where, attributes } = {}) => ({
      model: models.EpisodeCrew,
      as: 'crew',
      where,
      attributes,
      include: {
        model: models.Person,
        as: 'person',
      }
    }),

    crew: ({ where, attributes } = {}) => ({
      model: models.EpisodeGuest,
      as: 'guests',
      where,
      attributes,
      include: {
        model: models.Person,
        as: 'person',
      }
    }),
  }
};
