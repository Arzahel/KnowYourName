const router = require('express').Router();
const { needAuth } = require('../../utils/auth');

const serial = require('../../controllers/serial');
const episode = require('../../controllers/episode');
const comment = require('../../controllers/comment');

router.get('/', serial.getByPage);
router.get('/search', serial.search);
router.get('/genre/:genre', serial.getByGenre);
router.get('/:id', serial.getShortInfo);
router.get('/:id/details', serial.getDetails);

router.get('/:id/comment', comment.getSerialComments);
router.post('/:id/comment', needAuth, comment.create, serial.addComment);
router.put('/:id/comment', needAuth, comment.update);
router.delete('/:id/comment', needAuth, comment.remove);

router.post('/:id/rate', needAuth, serial.rate);

router.post('/:id/favorite', needAuth, serial.addToFavorite);
router.delete('/:id/favorite', needAuth, serial.removeFromFavorite);

router.get('/:id/season', serial.getSeasons);
router.get('/:id/season/:seasonId', serial.getSeasonInfo);

router.get('/:id/season/:seasonId/episode/', episode.getSeasonEpisodes);
router.get('/:id/season/:seasonId/episode/:episodeId/', episode.getById);

router.get('/:id/season/:seasonId/episode/:episodeId/comment', comment.getEpisodeComments);
router.post('/:id/season/:seasonId/episode/:episodeId/comment', needAuth, comment.create, episode.addComment);
router.put('/:id/season/:seasonId/episode/:episodeId/comment', needAuth, comment.update);
router.delete('/:id/season/:seasonId/episode/:episodeId/comment', needAuth, comment.remove);

router.post('/:id/season/:seasonId/episode/:episodeId/rate', needAuth, episode.rate);

module.exports = router;
