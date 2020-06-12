module.exports = (sequelize, DataTypes) => {
  const GenreSerial = sequelize.define(
    'GenreSerial',
    {
      genreId: DataTypes.INTEGER,
      serialId: DataTypes.INTEGER,
    },
    {},
  );

  return GenreSerial;
};
