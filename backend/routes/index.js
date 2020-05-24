const express = require('express');

const router = express.Router();

const apiRouter = require('./api/index');

/* GET home page. */
router.use('/api', apiRouter);
module.exports = router;
