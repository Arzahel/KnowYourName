module.exports = (sequelize, DataTypes) => {
  const GenreMovie = sequelize.define(
    'GenreMovie',
    {
      genreId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
    },
    {},
  );

  return GenreMovie;
};
