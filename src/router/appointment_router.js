const express = require('express');
const router = express.Router();

const {getAppointments, getAppointment, postAppointment, putAppointment} = require('../controller/appointments_controller.js');

router.get('/vettion/appointments', getAppointments);
router.get('/vettion/appointments/:id_appointment', getAppointment);
router.post('/vettion/appointments', postAppointment);
router.put('/vettion/appointments/:id_appointment', putAppointment);

module.exports = router;