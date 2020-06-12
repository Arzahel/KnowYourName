const models = require('../../models');

const getAllByOptions = (options) => models.Comment.findAll(options);

module.exports = {
  create: (data) => models.Comment.create(data),

  updateById: async (id, userId, data) =>
    models.Comment.update(data, {
      where: {
        id,
        userId,
      },
    }),

  remove: async (query) => {
    const countOfDeletedElements = await models.Comment.destroy(query);

    return countOfDeletedElements === 1;
  },

  getAllByOptions,

  getByMovieId: async (movieId) => {
    const query = {
      attributes: {
        exclude: ['userId'],
      },
      include: [
        {
          model: models.Movie,
          attributes: [],
          where: { id: movieId },
          as: 'movies',
          through: {
            model: models.MovieComment,
            attributes: [],
            where: {
              movieId,
            },
          },
        },
        {
          model: models.User,
          attributes: ['id'],
          include: {
            model: models.Profile,
            as: 'profile',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
            },
          },
        },
      ],
    };

    return getAllByOptions(query);
  },

  getBySerialId: async (id) => {
    const query = {
      attributes: {
        exclude: ['userId'],
      },
      include: [
        {
          model: models.Serial,
          attributes: [],
          where: { id },
          as: 'serials',
          through: {
            model: models.SerialComment,
            attributes: [],
            where: {
              serialId: id,
            },
          },
        },
        {
          model: models.User,
          as: 'user',
          attributes: ['id'],
          include: {
            model: models.Profile,
            as: 'profile',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
            },
          },
        },
      ],
    };

    return getAllByOptions(query);
  },

  getByEpisodeId: async (id) => {
    const query = {
      attributes: {
        exclude: ['userId'],
      },
      include: [
        {
          model: models.Episode,
          attributes: [],
          where: { id },
          as: 'episodes',
          through: {
            model: models.EpisodeComment,
            attributes: [],
            where: {
              episodeId: id,
            },
          },
        },
        {
          model: models.User,
          as: 'user',
          attributes: ['id'],
          include: {
            model: models.Profile,
            as: 'profile',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
            },
          },
        },
      ],
    };

    return getAllByOptions(query);
  },
};
