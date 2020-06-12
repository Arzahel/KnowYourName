module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      parentId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      text: DataTypes.STRING,
    },
    {},
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    Comment.belongsToMany(models.Movie, {
      as: 'movies',
      through: {
        model: models.MovieComment,
        unique: false,
      },
      foreignKey: 'commentId',
    });

    Comment.belongsToMany(models.Serial, {
      as: 'serials',
      through: {
        model: models.SerialComment,
        unique: false,
      },
      foreignKey: 'commentId',
    });

    Comment.belongsToMany(models.Episode, {
      as: 'episodes',
      through: {
        model: models.EpisodeComment,
        unique: false,
      },
      foreignKey: 'commentId',
    });
  };

  return Comment;
};
