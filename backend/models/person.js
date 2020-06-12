module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    'Person',
    {
      birthday: DataTypes.DATE,
      department: DataTypes.STRING,
      deathday: DataTypes.DATE,
      biography: DataTypes.TEXT,
      placeOfBirth: DataTypes.STRING,
      imdbId: DataTypes.STRING,
      homepage: DataTypes.STRING,
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {},
  );

  Person.associate = (models) => {
    Person.hasMany(models.MovieCrew, {
      foreignKey: 'personId',
      as: 'crew',
      sourceKey: 'id',
    });

    Person.hasMany(models.MovieCast, {
      foreignKey: 'personId',
      as: 'cast',
      sourceKey: 'id',
    });

    Person.hasMany(models.EpisodeCrew, {
      foreignKey: 'personId',
      as: 'episodesAsCrew',
      sourceKey: 'id',
    });

    Person.hasMany(models.EpisodeGuest, {
      foreignKey: 'personId',
      as: 'episodesAsGuest ',
      sourceKey: 'id',
    });

    Person.belongsToMany(models.Serial, {
      through: 'SerialCreator',
      as: 'serials',
      foreignKey: 'personId',
    });
  };

  return Person;
};
