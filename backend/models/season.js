module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define(
    'Season',
    {
      serialId: DataTypes.INTEGER,
      number: DataTypes.INTEGER,
      airDate: DataTypes.DATE,
      name: DataTypes.STRING,
      overview: DataTypes.TEXT,
      poster: DataTypes.STRING,
    },
    {},
  );

  Season.associate = (models) => {
    Season.belongsTo(models.Serial, {
      foreignKey: 'id',
      sourceKey: 'serialId',
      onDelete: 'CASCADE',
    });

    Season.hasMany(models.Episode, {
      foreignKey: 'seasonId',
      sourceKey: 'id',
      as: 'episodes',
    });
  };

  return Season;
};
