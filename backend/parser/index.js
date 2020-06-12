const { CronJob } = require('cron');
const genres = require('./genre');
const movie = require('./movie');
const serial = require('./serial');

const logger = require('../utils/logger');

const init = async () => {
  await serial.parse();
  await movie.parseAndSave();
  await genres.parseAndSaveToDb();
};

const job = new CronJob('00 00 00 * * *', async () => {
  const startedAt = new Date();

  logger.info('Parsing start', ['Parser', 'Index']);
  try {
    await init();
  } catch (err) {
    logger.error(err, ['Parser', 'Index']);
  }
  logger.info(`Parsing end. Time: ${new Date() - startedAt}`, ['Parser', 'Index']);
});

job.start();
