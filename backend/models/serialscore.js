'use strict';
module.exports = (sequelize, DataTypes) => {
  const SerialScore = sequelize.define(
    'SerialScore',
    {
      serialId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
    },
    {},
  );

  SerialScore.associate = (models) => {
    SerialScore.belongsTo(models.Serial, {
      foreignKey: 'serialId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return SerialScore;
};
