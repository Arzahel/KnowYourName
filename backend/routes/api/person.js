const express = require('express');
const router = express.Router();

const personService = require('../../controllers/person');

router.get('/:id', personService.getById);

module.exports = router;
