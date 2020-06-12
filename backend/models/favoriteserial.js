'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteSerial = sequelize.define(
    'FavoriteSerial',
    {
      serialId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {},
  );

  FavoriteSerial.associate = (models) => {
    FavoriteSerial.belongsTo(models.Serial, {
      foreignKey: 'serialId',
      targetId: 'id',
      as: 'serial',
      onDelete: 'CASCADE',
    });

    FavoriteSerial.belongsTo(models.User, {
      foreignKey: 'userId',
      targetId: 'id',
      onDelete: 'CASCADE',
    });
  };


  return FavoriteSerial;
};
