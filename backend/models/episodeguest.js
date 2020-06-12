'use strict';
module.exports = (sequelize, DataTypes) => {
  const EpisodeGuest = sequelize.define(
    'EpisodeGuest',
    {
      episodeId: DataTypes.INTEGER,
      personId: DataTypes.INTEGER,
      character: DataTypes.STRING,
    },
    {},
  );

  EpisodeGuest.associate = (models) => {
    EpisodeGuest.belongsTo(models.Episode, {
      foreignKey: 'episodeId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    EpisodeGuest.belongsTo(models.Person, {
      foreignKey: 'personId',
      as: 'person',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return EpisodeGuest;
};
