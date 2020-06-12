
module.exports = (sequelize, DataTypes) => {
  const MovieCrew = sequelize.define('MovieCrew', {
    department: DataTypes.STRING,
    job: DataTypes.STRING,
    personId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
  }, {});

  MovieCrew.associate = (models) => {
    MovieCrew.belongsTo(models.Movie, {
      foreignKey: 'movieId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    MovieCrew.belongsTo(models.Person, {
      foreignKey: 'personId',
      as: 'personData',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };

return MovieCrew;
};
