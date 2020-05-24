const { Genre } = require('../../models');

/**
 * @typedef {Object} Genre
 * @property {Number} id
 * @property {String} name
 */

module.exports = {

  /**
   * @param {String} name
   * @returns {Genre} finding or created genre
   */
  findOrCreate: (name) => {
    const options = {
      where: {
        name,
      },
      defaults: {
        name,
      },
    };

    return Genre.findOrCreate(options);
  },
};
