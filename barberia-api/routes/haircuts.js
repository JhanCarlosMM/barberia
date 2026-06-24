// routes/haircuts.js
const express = require('express');
const router = express.Router();
const { getHaircuts } = require('../controllers/haircutsController');

router.get('/', getHaircuts);

module.exports = router;