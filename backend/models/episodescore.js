'use strict';
module.exports = (sequelize, DataTypes) => {
  const EpisodeScore = sequelize.define(
    'EpisodeScore',
    {
      episodeId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
    },
    {},
  );

  EpisodeScore.associate = (models) => {
    EpisodeScore.belongsTo(models.Episode, {
      foreignKey: 'episodeId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return EpisodeScore;
};
