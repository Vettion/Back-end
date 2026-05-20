// Archivo de validaciones para citas

const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');

/**
 * Cadena de validaciones para operaciones que requieren un Id de cita.
 * Se aplica a rutas dinamicas como GET /vettion/appointment/:id_appointment.
 * * Reglas:
 * 1. El parametro 'id_appointment' debe exis   tir en la URL.
 * 2. El parametro 'id_appointment' debe ser un numero entero mayor que 0.
 */
const validateAppointmentId = [
    param('id_appointment')
        .notEmpty().withMessage('id_appointment is required')
        .isInt({ gt: 0 }).withMessage('id_appointment must be a positive integer'),
    
    validateResult
];

/**
 * Cadena de validaciones para operaciones que requieren un Id de cita.
 * Se aplica a rutas dinamicas como GET /vettion/appointment/pet/:pet_id.
 * * Reglas:
 * 1. El parametro 'pet_id' debe exis   tir en la URL.
 * 2. El parametro 'pet_id' debe ser un numero entero mayor que 0.
 */
const validateAppointmentByPetId = [
    param('pet_id')
        .notEmpty().withMessage('pet_id is required')
        .isInt({ gt: 0 }).withMessage('pet_id must be a positive integer'),
    
    validateResult
];

/**
 * Cadena de validaciones para operaciones que requieren un Id de cita.
 * Se aplica a rutas dinamicas como GET /vettion/appointment/room/:code_room.
 * * Reglas:
 * 1. El parametro 'code_room' debe existir en la URL.
 * 2. El parametro 'code_room' debe ser un numero entero mayor que 0.
 */
const validateAppointmentByRoomCode = [
    param('code_room')
        .notEmpty().withMessage('code_room is required')
        .isInt({ gt: 0 }).withMessage('code_room must be a positive integer'),
    
    validateResult
];

 /**
  * Cadena de validaciones para la creacion de una nueva cita.
  * Se aplica a la ruta de POST /vettion/appointment/:id_appointment.
  * * Reglas: 
  * 1. El campo 'date_appointment' es obligatorio y debe ser una fecha valida.
  * 2. El campo 'start_time' es obligatorio y debe ser una hora valida.
  * 3. El campo 'pet_id' es obligatorio y debe ser un numero entero positivo y que exista en la tabla de mascotas.
  * 4. El campo 'consult_room' es obligatorio y debe ser un numero entero positivo y que exista en la tabla de salas.
  * 5. El campo 'veterinarian_dni' es obligatorio y debe ser una cadena de texto y tener 9 caracteres.
  * 6. El campo 'cleaner_dni' es obligatorio y debe ser una cadena de texto y tener 9 caracteres.
  */
const validateAddAppointment = [
    body('date_appointment')
        .trim()
        .notEmpty().withMessage('date_appointment is required')
        .isDate().withMessage('date_appointment must be a date'),
    
    body('start_time')
        .trim()
        .notEmpty().withMessage('start_time is required')
        .isTime().withMessage('start_time must be a time'),
    
    validateResult
];

/**
 * Cadena de validaciones para la actualizacion completa de una cita.
 * Se aplica a la ruta PUT /vettion/appointment/:id_appointment.
 * * Reglas:
 * 1. El parametro 'id_appointment' debe existir en la URL y ser un numero entero positivo.
 * 2. El cuerpo de la peticion debe cumplir las mismas reglas que la creacion (POST)
 */
const validateUpdateAppointment = [
    param('id_appointment')
        .notEmpty().withMessage('id_appointment is required')
        .isInt({ gt: 0 }).withMessage('id_appointment must be a positive integer'),

    ...validateAddAppointment.slice(0, -1),

    validateResult
]

module.exports = {
    validateAppointmentId,
    validateAppointmentByPetId,
    validateAppointmentByRoomCode,
    validateAddAppointment,
    validateUpdateAppointment
}