module.exports = (sequelize, DataTypes) => {
  const MovieComment = sequelize.define(
    'MovieComment',
    {
      movieId: DataTypes.INTEGER,
      commentId: DataTypes.NUMBER,
    },
    {},
  );

  MovieComment.associate = (models) => {
    MovieComment.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      targetId: 'id',
      onDelete: 'CASCADE',
    });

    MovieComment.belongsTo(models.Movie, {
      foreignKey: 'movieId',
      targetId: 'id',
      onDelete: 'CASCADE',
    });
  };

  return MovieComment;
};
