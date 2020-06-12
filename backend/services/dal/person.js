const models = require('../../models');

/**
 * @typedef Person
 * @property {Date} birthday
 * @property {String} department
 * @property {Date} deathday
 * @property {String} biography
 * @property {String} placeOfBirth
 * @property {String} imdbId
 * @property {String} homepage
 * @property {String} name
 * @property {String} photo
 */

module.exports = {

  /**
   * @param {String} name
   * @returns {Person} finding person
   */
  findBy: (name) => {
    const options = {
      where: {
        name,
      },
    };

    return models.Person.findOne(options);
  },

  /**
   * @param {Person} data
   * @returns {(Person|null)} created person
   */
  create: (data) => {
    if (!data) {
      return null;
    }

return models.Person.create(data);
  },

  getById: (id, query = {}) => models.Person.findByPk(id, query),
};
