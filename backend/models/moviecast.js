
module.exports = (sequelize, DataTypes) => {
  const MovieCast = sequelize.define('MovieCast', {
    character: DataTypes.STRING,
    personId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
  }, {});

  MovieCast.associate = (models) => {
    MovieCast.belongsTo(models.Movie, {
      foreignKey: 'movieId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    MovieCast.belongsTo(models.Person, {
      foreignKey: 'personId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'person',
    });
  };

return MovieCast;
};
