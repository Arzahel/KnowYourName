const models = require('../../models');
const scoreService = require('./score');

module.exports = {
  getById: (id, includeGenres = false) => {
    const options = {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [],
    };

    if (includeGenres) {
      const data = {
        model: models.Genre,
        as: 'genres',
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      };

      options.include.push(data);
    }

    return models.Movie.findByPk(id, options);
  },

  getCredits: async (id) => {
    const options = {
      attributes: [],
      include: [
        {
          model: models.MovieCrew,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'movieId', 'personId'],
          },
          include: {
            model: models.Person,
            attributes: ['id', 'name', 'photo'],
            as: 'personData',
          },
          as: 'crew',
        },
        {
          model: models.MovieCast,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'movieId', 'personId'],
          },
          include: {
            model: models.Person,
            attributes: ['id', 'name', 'photo'],
            as: 'person',
          },
          as: 'cast',
        },
      ],
    };

    return models.Movie.findByPk(id, options);
  },

  getByOptions: (options, includeGenres = false) => {
    if (!options) {
      return null;
    }

    const query = options;

    if (includeGenres) {
      query.include = options.include || [];
      const data = {
        model: models.Genre,
        as: 'genres',
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      };

      query.include.push(data);
    }

    return models.Movie.findAll(query);
  },

  findAndCountAll: (options) => {
    if (!options) {
      return null;
    }

    const query = options;

    query.distinct = true;
    query.include = options.include || [];
    const data = {
      model: models.Genre,
      as: 'genres',
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      },
    };

    query.include.push(data);

    return models.Movie.findAndCountAll(query);
  },

  addScore: async (id, scoreData) => {
    const t = await models.sequelize.transaction();

    await scoreService.movie.createOrUpdate(scoreData, t);
    const averageScore = await scoreService.movie.getAverageScore(id, t);

    await models.Movie.update(
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

  create: (data) => {
    return data ? models.Movie.create(data) : null;
  },

  createOrUpdate: async (data) => {
    if (data) {
      const movie = await models.Movie.findOne({
        where: {
          imdbId: data.imdbId || null,
          title: data.title,
          releaseDate: data.releaseDate,
        },
      });

      return movie ? movie.update(data) : models.Movie.create(data);
    }

    return null;
  },

  createMovieCrew: async (data) => {
    if (data) {
      const movieCrew = await models.MovieCrew.findOne({
        where: { movieId: data.movieId, personId: data.personId },
      });

      return movieCrew ? movieCrew.update(data) : models.MovieCrew.create(data);
    }

    return null;
  },

  createMovieCast: async (data) => {
    if (data) {
      const movieCast = await models.MovieCast.findOne({
        where: { movieId: data.movieId, personId: data.personId },
      });

      return movieCast ? movieCast.update(data) : models.MovieCast.create(data);
    }

    return null;
  },

  getGenres: () =>
    models.Genre.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    }),

  addComment: async (id, comment) => {
    const movie = await models.Movie.findByPk(id);

    await movie.addComment(comment);
  },

  getPopular: (limit = 10) => {
    return models.Movie.findAll({
      attributes: {
        include: [[models.Sequelize.fn('count', models.Sequelize.col('scores.id')), 'countOfRatings']],
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: models.MovieScore,
        as: 'scores',
        attributes: [],
        duplicating: false,
      },
      group: ['movie.id'],
      order: [[models.Sequelize.col('countOfRatings'), 'DESC']],
      limit,
    });
  },
};
