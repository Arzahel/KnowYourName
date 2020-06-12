const Promise = require('bluebird');

const logger = require('../utils/logger');

const { serial, genre } = require('../services/dal');
const parser = require('./parser');
const { getPerson } = require('./person');
const season = require('./season');

const api = require('./config/parser');

const parseById = async (id) => {
  const data = await parser.parse(api.serial(id));

  if (!data.id) {
    return null;
  }
  const {
    name,
    original_name: originalName,
    overview,
    first_air_date: firstAirDate,
    last_air_date: lastAirDate,
    next_episode_to_air: nextEpisodeToAir,
    homepage,
    poster_path: poster,
    original_language: language,
    status,
    in_production: inProduction,
    created_by: creators,
    genres,
    seasons,
  } = data;

  return {
    dataToSave: {
      name,
      originalName,
      overview,
      firstAirDate,
      lastAirDate,
      nextEpisodeToAir,
      homepage,
      poster: api.image(poster),
      language,
      status,
      inProduction,
    },
    seasons,
    creators,
    genres,
  };
};

const saveSerial = async (data) => {
  try {
    const result = await serial.createOrUpdate(data);

    return result;
  } catch (err) {
    logger.error(err, ['Parser', 'Serial', 'saveSerial', `Data: ${data}`]);
  }
};

const addGenres = async (serialModel, genres) => {
  try {
    await Promise.each(genres || [], async (item) => {
      const savedGenre = await genre.findOrCreate(item.name);

      if (savedGenre) {
        await serialModel.addGenre(savedGenre);
      }
    });
  } catch (err) {
    logger.error(err, ['Parser', 'Serial', 'addGenres', `Serial id: ${serialModel.id}`]);
  }
};

const addCreators = async (serialId, creators) => {
  await Promise.each(creators || [], async (item) => {
    try {
      const person = await getPerson(item.id, item.name);

      if (person) {
        await serial.createCreator({ serialId, personId: person.id });
      }

      await Promise.delay(api.DELAY);
    } catch (err) {
      logger.error(err, ['Parser', 'Serial', 'addCreators', `Creator id: ${item.id}, Serial id: ${serialId}`]);
    }
  });
};

const parseAndSaveById = async (id) => {
  try {
    const result = await parseById(id);

    if (!result) {
      return;
    }

    const savedSerial = await saveSerial(result.dataToSave);

    if (!savedSerial) {
      return;
    }
    await addGenres(savedSerial, result.genres);
    await addCreators(savedSerial.id, result.creators);
    await season.createSerialSeasons(id, savedSerial.id, result.seasons);
  } catch (err) {
    logger.error(err, ['Parser', 'Serial', 'parseAndSaveById', `Id: ${id}`]);
  }
};

module.exports = {
  parse: async () => {
    try {
      const data = await parser.parse(api.latestSerial);

      if (!(data && data.id)) {
        logger.warn('Cannot get latest serial', ['Parser', 'Serial', 'parse', `Latest serial`]);

        return;
      }

      const latestId = +data.id;

      await Promise.each([...Array(latestId)], async (item, index) => {
        await parseAndSaveById(index + 1);

        await Promise.delay(api.DELAY);
      });
    } catch (err) {
      logger.error(err, ['Parser', 'Serial', 'parse']);
    }
  },
};
