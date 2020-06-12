const Promise = require('bluebird');

const { getPerson } = require('./person');
const { episode } = require('../services/dal');
const logger = require('../utils/logger');
const { DELAY } = require('./config/parser');
const { image } = require('./config/parser');

const saveCrew = async (episodeId, crewArray) => {
  try {
    await Promise.each(crewArray, async (item) => {
      const person = await getPerson(item.id, item.name);

      await episode.createCrew({ episodeId, personId: person.id, department: item.department, job: item.job });
      await Promise.delay(DELAY);
    });
  } catch (err) {
    logger.error(err, ['Parser', 'Episode', 'saveCrew', `Episode id: ${episodeId}`]);
  }
};

const saveGuests = async (episodeId, guests) => {
  try {
    await Promise.each(guests, async (item) => {
      const person = await getPerson(item.id, item.name);

      await episode.createGuest({ episodeId, personId: person.id, character: item.character });
      await Promise.delay(DELAY);
    });
  } catch (err) {
    logger.error(err, ['Parser', 'Episode', 'saveGuests', `Episode id: ${episodeId}`]);
  }
};

const saveById = async (seasonId, episodeData) => {
  try {
    const { episode_number: number, name, overview, air_date: airDate, still_path: poster } = episodeData;

    const savedEpisode = await episode.createOrUpdate({
      seasonId,
      number,
      name,
      overview,
      airDate,
      poster: image(poster),
    });

    if (!savedEpisode) {
      return;
    }

    await saveCrew(savedEpisode.id, episodeData.crew);
    await saveGuests(savedEpisode.id, episodeData.guest_stars);
  } catch (err) {
    logger.error(err, ['Parser', 'Episode', 'saveById', `Season id: ${seasonId}`]);
  }
};

module.exports = {
  saveSeasonEpisodes: async (seasonId, episodes) => {
    try {
      await Promise.each(episodes, async (item) => {
        await saveById(seasonId, item);
      });
    } catch (err) {
      logger.error(err, ['Parser', 'Season', 'saveEpisodes', `Season id: ${seasonId}`]);
    }
  },
};
