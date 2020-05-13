const express = require('express');
const userController = require('../../controllers/user');
const authHelper = require('../../utils/auth');

const router = express.Router();

router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);
router.get('/logout', authHelper.needAuth, userController.logout);

module.exports = router;