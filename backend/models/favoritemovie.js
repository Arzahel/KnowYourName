module.exports = (sequelize, DataTypes) => {
  const FavoriteMovie = sequelize.define(
    'FavoriteMovie',
    {
      movieId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {},
  );

  FavoriteMovie.associate = (models) => {
    FavoriteMovie.belongsTo(models.Movie, {
      foreignKey: 'movieId',
      targetId: 'id',
      as: 'movie',
      onDelete: 'CASCADE',
    });

    FavoriteMovie.belongsTo(models.User, {
      foreignKey: 'userId',
      targetId: 'id',
      onDelete: 'CASCADE',
    });
  };

  return FavoriteMovie;
};
