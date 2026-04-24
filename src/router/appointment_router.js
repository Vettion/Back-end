const express = require('express');
const router = express.Router();

const {getAppointments, getAppointment} = require('../controller/appointments_controller.js');

router.get('/vettion/appointments', getAppointments);
router.get('/vettion/appointments/:id_appointment', getAppointment);

module.exports = router;