const Promise = require('bluebird');

const parser = require('./parser');
const { getPerson } = require('./person');

const { movie: url, image: imagePathGenerator, latestMovie } = require('./config/parser');
const { movie: movieService, genre: genreService } = require('../services/dal');
const logger = require('../utils/logger');

const DELAY = 500;

const addGenres = async (movie, genres) => {
  try {
    await Promise.each(genres, async (item) => {
      const genre = await genreService.findOrCreate(item.name);

      if (genre) {
        movie.addGenre(genre);
      }
    });
  } catch (err) {
    logger.error(err, ['Parser', 'Movie', 'addGenres', `Movie id: ${movie.id}`]);
  }
};

const addCrew = async (movieId, crew) => {
  try {
    await Promise.each(crew, async (item) => {
      const person = await getPerson(item.id, item.name);

      const data = {
        department: item.department,
        job: item.job,
        movieId,
        personId: person.id,
      };

      await movieService.createMovieCrew(data);
      await Promise.delay(DELAY);
    });
  } catch (err) {
    logger.error(err, ['Parser', 'Movie', 'addCrew', `Movie id: ${movieId}`]);
  }
};

const addCast = async (movieId, cast) => {
  try {
    await Promise.each(cast, async (item) => {
      const person = await getPerson(item.id, item.name);

      const data = {
        character: item.character,
        movieId,
        personId: person.id,
      };

      await movieService.createMovieCast(data);
      await Promise.delay(DELAY);
    });
  } catch (err) {
    logger.error(err, ['Parser', 'Movie', 'addCast', `Movie id: ${movieId}`]);
  }
};

/**
 *
 * @param {Number} sourceMovieId Parsed movie id from API
 * @param {Object} movie Movie from db
 * @returns {Boolean}
 */
const addCredits = async (sourceMovieId, movie) => {
  try {
    const results = await parser.parse(url(sourceMovieId, true));

    if (!results) {
      return;
    }

    await addCrew(movie.id, results.crew);
    await addCast(movie.id, results.cast);
  } catch (err) {
    logger.error(err, ['Parser', 'Movie', 'addCredits', `Source movie id: ${sourceMovieId}, movieId: ${movie.id}`]);
  }
};

const saveToDb = async (sourceMovie) => {
  const {
    title,
    original_title: originalTitle,
    overview,
    release_date: releaseDate,
    original_language: language,
    budget,
    homepage,
    status,
    imdbId,
    runtime,
    revenue,
  } = sourceMovie;
  const poster = imagePathGenerator(sourceMovie.poster_path);

  try {
    const movie = await movieService.createOrUpdate({
      title,
      originalTitle,
      overview,
      releaseDate,
      language,
      budget,
      homepage,
      status,
      imdbId,
      runtime,
      revenue,
      poster,
    });

    await addGenres(movie, sourceMovie.genres);
    await addCredits(sourceMovie.id, movie);

    return movie;
  } catch (err) {
    logger.error(err, ['Parser', 'Movie', 'saveToDb', `Source movie id: ${sourceMovie.id}`]);

    return null;
  }
};

const saveMovieById = async (id) => {
  try {
    const data = await parser.parse(url(id));

    if (data.id) {
      return await saveToDb(data);
    }

    return null;
  } catch (err) {
    logger.error(err, ['Parser', 'Movie', 'SaveMovieById', `Movie id ${id}`]);

    return null;
  }
};

module.exports = {
  parseAndSave: async () => {
    try {
      const data = await parser.parse(latestMovie);

      if (!(data && data.id)) {
        logger.warn('Cannot get latest movie', ['Parser', 'Movie', 'ParseAndSave', `Latest movie`]);

        return;
      }

      const latestId = data.id;

      await Promise.each([...Array(latestId)], async (item) => {
        await saveMovieById(item + 1);

        await Promise.delay(DELAY);
      });
    } catch (err) {
      return logger.error(err, ['Parser', 'Movie', 'ParseAndSave']);
    }
  },
};
