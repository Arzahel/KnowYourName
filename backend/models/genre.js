module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    'Genre',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {},
  );

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Serial, {
      through: 'GenreSerial',
      as: 'serials',
      foreignKey: 'genreId',
    });

    Genre.belongsToMany(models.Movie, {
      through: 'GenreMovie',
      as: 'movies',
      foreignKey: 'genreId',
    });
  };

  return Genre;
};
