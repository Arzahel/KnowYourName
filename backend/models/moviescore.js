module.exports = (sequelize, DataTypes) => {
  const MovieScore = sequelize.define(
    'MovieScore',
    {
      movieId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
    },
    {},
  );

  MovieScore.associate = (models) => {
    MovieScore.belongsTo(models.Movie, {
      foreignKey: 'movieId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    MovieScore.hasOne(models.Movie, {
      foreignKey: 'id',
      as: 'movie',
    });
  };

  return MovieScore;
};
