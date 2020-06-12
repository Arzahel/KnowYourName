'use strict';
module.exports = (sequelize, DataTypes) => {
  const EpisodeCrew = sequelize.define('EpisodeCrew', {
    episodeId: DataTypes.INTEGER,
    personId: DataTypes.INTEGER,
    department: DataTypes.STRING,
    job: DataTypes.STRING
  }, {});

  EpisodeCrew.associate = (models) => {
    EpisodeCrew.belongsTo(models.Episode, {
      foreignKey: 'episodeId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    EpisodeCrew.belongsTo(models.Person, {
      foreignKey: 'personId',
      as: 'person',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return EpisodeCrew;
};
