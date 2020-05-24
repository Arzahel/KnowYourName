const Promise = require('bluebird');

const parser = require('./parser');
const episode = require('./episode');
const api = require('./config/parser');
const { season } = require('../services/dal');
const logger = require('../utils/logger');

const parseById = async (apiSerialId, seasonNumber) => {
  try {
    const data = await parser.parse(api.season(apiSerialId, seasonNumber));

    if (!data.id) {
      return null;
    }

    const { air_date: airDate, name, overview, poster_path: poster, season_number: number, episodes } = data;

    return {
      dataToSave: { airDate, name, overview, poster: api.image(poster), number },
      episodes,
    };
  } catch (err) {
    logger.error(err, ['Parser', 'Season', 'parseById', `Serial id: ${apiSerialId} Season number: ${seasonNumber}`]);

    return null;
  }
};

const saveToDb = (serialId, data) => season.createOrUpdate({ serialId, ...data });

const parseAndSaveById = async (apiSerialId, serialId, seasonNumber) => {
  const result = await parseById(apiSerialId, seasonNumber);

  if (!result) {
    return;
  }

  const savedSeason = await saveToDb(serialId, result.dataToSave);

  if (!savedSeason) {
    return;
  }

  await episode.saveSeasonEpisodes(savedSeason.id, result.episodes);
};

module.exports = {
  createSerialSeasons: async (apiSerialId, serialId, seasons) => {
    await Promise.each(seasons || [], async (item) => {
      await parseAndSaveById(apiSerialId, serialId, item.season_number);

      await Promise.delay(api.DELAY);
    });
  },
};
