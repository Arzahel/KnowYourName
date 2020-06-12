const models = require('../../models');

/**
 * @typedef User
 * @property {String} email
 * @property {String} password
 * @property {Number} profile_id
 */

module.exports = {

  /**
   * @param {String} email
   * @returns {User} User
   */
  findByEmail: (email) => {
    const options = {
      where: {
        email,
      },
    };


return models.User.findOne(options);
  },

  /**
   * @param {Number} id
   * @returns {User} User
   */
  getById: id => models.User.findByPk(id),

  /**
   * @param {User} data
   * @returns {User} User
   */
  create: data => models.User.create(data),
};
