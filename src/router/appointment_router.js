const express = require('express');
const router = express.Router();

const {getAppointments, getAppointment, postAppointment} = require('../controller/appointments_controller.js');

router.get('/vettion/appointments', getAppointments);
router.get('/vettion/appointments/:id_appointment', getAppointment);
router.post('/vettion/appointments', postAppointment);

module.exports = router;