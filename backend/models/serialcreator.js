'use strict';
module.exports = (sequelize, DataTypes) => {
  const SerialCreator = sequelize.define(
    'SerialCreator',
    {
      serialId: DataTypes.INTEGER,
      personId: DataTypes.INTEGER,
    },
    {},
  );

  SerialCreator.associate = (models) => {
    SerialCreator.belongsTo(models.Serial, {
      foreignKey: 'serialId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    SerialCreator.belongsTo(models.Person, {
      foreignKey: 'personId',
      as: 'person',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return SerialCreator;
};
