module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define(
    'Episode',
    {
      seasonId: DataTypes.INTEGER,
      number: DataTypes.INTEGER,
      name: DataTypes.STRING,
      overview: DataTypes.TEXT,
      airDate: DataTypes.DATE,
      poster: DataTypes.STRING,
      averageScore: DataTypes.INTEGER,
    },
    {},
  );

  Episode.associate = (models) => {
    Episode.belongsTo(models.Season, {
      foreignKey: 'id',
      sourceKey: 'seasonId',
      onDelete: 'CASCADE',
    });

    Episode.hasMany(models.EpisodeCrew, {
      foreignKey: 'episodeId',
      as: 'crew',
      sourceKey: 'id',
    });

    Episode.hasMany(models.EpisodeGuest, {
      foreignKey: 'episodeId',
      as: 'guests',
      sourceKey: 'id',
    });

    Episode.hasMany(models.EpisodeScore, {
      foreignKey: 'episodeId',
      as: 'scores',
      sourceKey: 'id',
    });

    Episode.belongsToMany(models.Comment, {
      as: 'comments',
      through: {
        model: models.EpisodeComment,
        unique: false,
      },
      foreignKey: 'episodeId',
    });
  };

  return Episode;
};
