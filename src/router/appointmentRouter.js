const express = require('express');
const router = express.Router();

const {getAllAppointments, getAppointmentById, postAppointment, putAppointment, putCleanService, deleteAppointment} = require('../controller/appointmentController.js');
const { validateAppointmentId, validateAddAppointment, validateUpdateAppointment } = require('../validators/appointment.js');

router.get('/', getAllAppointments);
router.get('/:id_appointment', validateAppointmentId, getAppointmentById);
router.post('/', validateAddAppointment, postAppointment);
router.put('/:id_appointment', validateUpdateAppointment, putAppointment);
router.delete('/:id_appointment', validateAppointmentId, deleteAppointment);

module.exports = router;