// routes/barbers.js
const express = require('express');
const router = express.Router();
const { getBarbers } = require('../controllers/barbersController');

router.get('/', getBarbers);

module.exports = router;