'use strict';
module.exports = (sequelize, DataTypes) => {
  const EpisodeComment = sequelize.define(
    'EpisodeComment',
    {
      episodeId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
    },
    {},
  );

  EpisodeComment.associate = (models) => {
    EpisodeComment.belongsTo(models.Episode, {
      foreignKey: 'episodeId',
      targetId: 'id',
      onDelete: 'CASCADE',
    });

    EpisodeComment.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      targetId: 'id',
      onDelete: 'CASCADE',
    });
  };

  return EpisodeComment;
};
