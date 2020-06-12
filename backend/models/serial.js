module.exports = (sequelize, DataTypes) => {
  const Serial = sequelize.define(
    'Serial',
    {
      name: DataTypes.STRING,
      originalName: DataTypes.STRING,
      overview: DataTypes.TEXT,
      firstAirDate: DataTypes.DATE,
      lastAirDate: DataTypes.DATE,
      nextEpisodeToAir: DataTypes.DATE,
      homepage: DataTypes.TEXT,
      poster: DataTypes.STRING,
      averageScore: DataTypes.INTEGER,
      language: DataTypes.STRING,
      status: DataTypes.STRING,
      inProduction: DataTypes.BOOLEAN,
    },
    {},
  );

  Serial.associate = (models) => {
    Serial.hasMany(models.FavoriteSerial, {
      foreignKey: 'serialId',
      as: 'favorites',
      sourceKey: 'id',
    });

    Serial.hasMany(models.SerialScore, {
      foreignKey: 'serialId',
      as: 'scores',
      sourceKey: 'id',
    });

    Serial.hasMany(models.Season, {
      foreignKey: 'serialId',
      sourceKey: 'id',
      as: 'seasons',
    });

    Serial.belongsToMany(models.Person, {
      through: 'SerialCreator',
      as: 'creators',
      foreignKey: 'serialId',
    });

    Serial.belongsToMany(models.Genre, {
      through: 'GenreSerial',
      as: 'genres',
      foreignKey: 'serialId',
    });

    Serial.belongsToMany(models.Comment, {
      as: 'comments',
      through: {
        model: models.SerialComment,
        unique: false,
      },
      foreignKey: 'serialId',
    });
  };

  return Serial;
};
