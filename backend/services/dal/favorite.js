const models = require('../../models');

module.exports = {
  getFavoritesByUserId: (userId) => {
    const options = {
      where: {
        userId,
      },

      attributes: {
        exclude: ['movieId', 'userId'],
      },

      include: {
        model: models.Movie,
        as: 'movie',
        attributes: {
          exclude: ['movieId', 'userId'],
        },
      },
    };

    return models.FavoriteMovie.findAndCountAll(options);
  },

  addMovie: (data) => {
    const where = {
      movieId: data.movieId,
      userId: data.userId,
    };

    return models.FavoriteMovie.findOrCreate({
      where,
      data,
    });
  },

  removeMovie: async ({ userId, movieId }) =>
    models.FavoriteMovie.destroy({
      where: {
        userId,
        movieId,
      },
    }),

  addSerial: (data) => {
    const where = {
      serialId: data.serialId,
      userId: data.userId,
    };

    return models.FavoriteSerial.findOrCreate({
      where,
      data,
    });
  },

  removeSerial: async ({ userId, serialId }) =>
    models.FavoriteSerial.destroy({
      where: {
        userId,
        serialId,
      },
    }),
};
