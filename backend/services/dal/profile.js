const { Profile } = require('../../models');

module.exports = {
  update: async (userId, profileData) => Profile.update(profileData, { where: { userId } }),

  getByUserId: (userId) => Profile.findOne({ where: { userId } }),

  create: (data) => Profile.create(data),
};
