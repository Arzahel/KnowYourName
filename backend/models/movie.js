module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'Movie',
    {
      title: DataTypes.STRING,
      poster: DataTypes.STRING,
      originalTitle: DataTypes.STRING,
      overview: DataTypes.TEXT,
      releaseDate: DataTypes.DATE,
      language: DataTypes.STRING,
      averageScore: DataTypes.FLOAT,
      budget: DataTypes.INTEGER,
      homepage: DataTypes.STRING,
      status: DataTypes.STRING,
      imdbId: DataTypes.STRING,
      runtime: DataTypes.INTEGER,
      revenue: DataTypes.INTEGER,
    },
    {},
  );

  Movie.associate = (models) => {
    Movie.belongsToMany(models.Genre, {
      through: 'GenreMovie',
      as: 'genres',
      foreignKey: 'movieId',
    });

    Movie.hasMany(models.MovieCast, {
      foreignKey: 'movieId',
      as: 'cast',
      sourceKey: 'id',
    });

    Movie.hasMany(models.MovieCrew, {
      foreignKey: 'movieId',
      as: 'crew',
      sourceKey: 'id',
    });

    Movie.belongsToMany(models.Comment, {
      as: 'comments',
      through: {
        model: models.MovieComment,
        unique: false,
      },
      foreignKey: 'movieId',
    });

    Movie.hasMany(models.FavoriteMovie, {
      foreignKey: 'movieId',
      as: 'favorites',
      sourceKey: 'id',
    });

    Movie.hasMany(models.MovieScore, {
      foreignKey: 'movieId',
      as: 'scores',
      sourceKey: 'id',
    });
  };

  return Movie;
};
