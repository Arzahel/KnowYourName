module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      birthday: DataTypes.DATE,
      avatar: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {},
  );

  // TODO add validation username before add and update
  Profile.associate = (models) => {
  };

  return Profile;
};

