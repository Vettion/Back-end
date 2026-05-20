const express = require('express');
const router = express.Router();

const {getAllAppointments, getAppointmentById, getAppointmentByPetId, getAppointmentByRoomId, postAppointment, putAppointment, putCleanService, deleteAppointment} = require('../controller/appointmentController.js');
const { validateAppointmentId, validateAppointmentByPetId, validateAppointmentByRoomCode, validateAddAppointment, validateUpdateAppointment } = require('../validators/appointment.js');
const { validateAddCleanService } = require('../validators/cleanService.js');

router.get('/', getAllAppointments);
router.get('/:id_appointment', validateAppointmentId, getAppointmentById);
router.get('/pet/:pet_id', validateAppointmentByPetId, getAppointmentByPetId);
router.get('/room/:code_room', validateAppointmentByRoomCode, getAppointmentByRoomId);
router.post('/', validateAddAppointment, validateAddCleanService, postAppointment);
router.put('/:id_appointment', validateUpdateAppointment, putAppointment);
router.delete('/:id_appointment', validateAppointmentId, deleteAppointment);

module.exports = router;