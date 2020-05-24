const parser = require('./parser');
const { person: url, profileImage } = require('./config/parser');
const logger = require('../utils/logger');
const { person: personService } = require('../services/dal');

/**
 *
 * @param {Object} sourcePerson Person data from request
 * @return {Boolean} Created person
 */
const saveToDb = async (sourcePerson) => {
  const {
    birthday,
    department,
    deathday,
    biography,
    place_of_birth: placeOfBirth,
    imdb_id: imdbId,
    homepage,
    name,
    profile_path: photo,
  } = sourcePerson;

  return personService.create({
    birthday,
    department,
    deathday,
    biography,
    placeOfBirth,
    imdbId,
    homepage,
    name,
    photo: profileImage(photo),
  });
};

/**
 * @param {String} id Person id from API
 * @return {Promise<Object>} Created person
 *
 */
const savePersonById = async (id) => {
  try {
    const data = await parser.parse(url(id));
    const person = await saveToDb(data);

    return person || null;
  } catch (err) {
    logger.error(err, ['Parser', 'Person', 'savePersonById', `Person id: ${id}`]);

    return null;
  }
};

module.exports = {

  /**
   * @param {Number} id Person id from response
   * @param {String} name Person name
   * @returns {Promise<Person>} Finding or created person
   */
  getPerson: async (id, name) => {
    try {
      const parsedPerson = await parser.parse(url(id));
      const personFromDb = await personService.findBy(name);

      if (personFromDb && parsedPerson.imdb_id === personFromDb.imdbId && parsedPerson.title === personFromDb.title) {
        return personFromDb;
      }

      return await savePersonById(id);
    } catch (err) {
      logger.error(err, ['Parser', 'Person', 'parseAndSave', `Person id: ${id}, name: ${name}`]);

      return null;
    }
  },
};
