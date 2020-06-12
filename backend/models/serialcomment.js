module.exports = (sequelize, DataTypes) => {
  const SerialComment = sequelize.define(
    'SerialComment',
    {
      serialId: DataTypes.INTEGER,
      commentId: DataTypes.NUMBER,
    },
    {},
  );

  SerialComment.associate = (models) => {
    SerialComment.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      targetId: 'id',
      onDelete: 'CASCADE',
    });

    SerialComment.belongsTo(models.Serial, {
      foreignKey: 'serialId',
      targetId: 'id',
      onDelete: 'CASCADE',
    });
  };

  return SerialComment;
};
