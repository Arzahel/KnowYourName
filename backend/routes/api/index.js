const router = require('express').Router();

const user = require('./user');
const profile = require('./profile');
const person = require('./person');

const { needAuth } = require('../../utils/auth');

router.use('/user', user);
router.use('/profile', needAuth, profile);
router.use('/person', person);

module.exports = router;
