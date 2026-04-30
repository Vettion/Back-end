const express = require('express');
const router = express.Router();

const {getAppointments, getAppointment, getCleanServices, getCleanService, postAppointment, putAppointment, deleteAppointment} = require('../controller/appointmentController.js');
const { validateAppointmentId, validateAddAppointment, validateUpdateAppointment } = require('../validators/appointment.js');

router.get('/vettion/appointments', getAppointments);
router.get('/vettion/appointments/:id_appointment', validateAppointmentId, getAppointment);
router.get('/vettion/clean_services', getCleanServices);
router.get('/vettion/clean_services/:id_clean_service', getCleanService);
router.post('/vettion/appointments', validateAddAppointment, postAppointment);
router.put('/vettion/appointments/:id_appointment', validateUpdateAppointment, putAppointment);
router.delete('/vettion/appointments/:id_appointment', validateAppointmentId, deleteAppointment);

module.exports = router;