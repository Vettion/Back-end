const express = require('express');
const router = express.Router();

const {getAppointments, getAppointment, getCleanServices, getCleanService, postAppointment, putAppointment, deleteAppointment} = require('../controller/appointmentController.js');

router.get('/vettion/appointments', getAppointments);
router.get('/vettion/appointments/:id_appointment', getAppointment);
router.get('/vettion/clean_services', getCleanServices);
router.get('/vettion/clean_services/:id_clean_service', getCleanService);
router.post('/vettion/appointments', postAppointment);
router.put('/vettion/appointments/:id_appointment', putAppointment);
router.delete('/vettion/appointments/:id_appointment', deleteAppointment);

module.exports = router;