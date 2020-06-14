const express = require('express');

const router = express.Router();

const profileController = require('../../controllers/profile');

router.get('/', profileController.get);
router.post('/update', profileController.update);
router.get('/favorites', profileController.getFavorites);
router.delete('/favorites', profileController.removeFavorite);
router.get('/scores', profileController.getMovieScores);

module.exports = router;
