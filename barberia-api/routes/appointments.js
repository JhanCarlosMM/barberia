// routes/appointments.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createAppointment, getUserAppointments } = require('../controllers/appointmentsController');

router.get('/', auth, getUserAppointments);
router.post('/', auth, createAppointment);

module.exports = router;