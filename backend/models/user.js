const bcrypt = require('bcrypt');
const crypto = require('crypto');

const config = require('../config/passport');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: DataTypes.STRING,
      activation: DataTypes.STRING,
    },
    {},
  );

  User.associate = (models) => {
    User.beforeCreate(async (user) => {
      const data = user;

      data.status = false;
      data.password = await bcrypt.hash(user.password, config.userPasswordSaltRounds);
      data.activation = await crypto.randomBytes(20).toString('hex');

      return data;
    });

    User.beforeUpdate(async (user) => {
      const data = user;

      if (user.changed('password')) {
        data.password = await bcrypt.hash(user.password, config.userPasswordSaltRounds);
      }

      return data;
    });

    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

    User.hasMany(models.MovieScore, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

    User.hasMany(models.FavoriteMovie, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

    User.hasMany(models.SerialScore, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

    User.hasMany(models.EpisodeScore, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

    User.hasMany(models.FavoriteSerial, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'profile',
    });
  };

  return User;
};
