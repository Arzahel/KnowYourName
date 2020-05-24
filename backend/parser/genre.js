const Promise = require('bluebird');
const parser = require('./parser');
const logger = require('../utils/logger');

const { genre: genreService } = require('../services/dal');
const url = require('./config/parser').genres;

module.exports = {

  /**
   * @summary Parsing genres from API and save it's to own database
   * @returns {Number}
   */
  parseAndSaveToDb: async () => {
    try {
      const results = await parser.parse(url);

      if (!(results && results.genres)) {
        return;
      }

      await Promise.each(results.genres, (item) => {
        return genreService.findOrCreate(item.name);
      });
    } catch (err) {
      logger.error(err, ['Parser', 'Genre', 'parseAndSaveToDb']);
    }
  },
};
