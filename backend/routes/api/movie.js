const express = require('express');

const router = express.Router();
const authHelper = require('../../utils/auth');

const movieController = require('../../controllers/movie');
const commentController = require('../../controllers/comment');

router.get('/', movieController.getByPage);
router.get('/popular', movieController.getPopular);

router.get('/search', movieController.search);
router.get('/genre', movieController.getGenres);
router.get('/genre/:genre', movieController.getByGenre);

router.get('/:id', movieController.getById);
router.get('/:id/credits', movieController.getCredits);

router.get('/:id/comment', commentController.getMovieComments);
router.post('/:id/comment', authHelper.needAuth, commentController.create);
router.put('/:id/comment', authHelper.needAuth, commentController.update);
router.delete('/:id/comment', authHelper.needAuth, commentController.remove);

router.post('/:id/rate', authHelper.needAuth, movieController.rate);

router.post('/:id/favorite', authHelper.needAuth, movieController.addToFavorite);
router.delete('/:id/favorite', authHelper.needAuth, movieController.removeFromFavorite);

module.exports = router;
