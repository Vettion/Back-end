// Archivo de validaciones

const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js')

/**
 * Cadena de validaciones para operaciones que requieren un Id de cita.
 * Se aplica a rutas dinamicas como GET /vettion/appointment/:id_appointment.
 * * Reglas:
 * 1. El parametro 'id_appointment' debe existir en la URL.
 * 2. El parametro 'id_appointment' debe ser un numero entero mayor que 0.
 */
const validateAppointmentId = [
    param('id_appointment')
        .notEmpty().withMessage('id_appointment is required')
        .isInt({ gt: 0 }).withMessage('id_appointment must be a positive integer'),
    
    validateResult
];

 /**
  * Cadena de validaciones para la creacion de una nueva cita.
  * Se aplica a la ruta de POST /vettion/appointment/:id_appointment.
  * * Reglas: 
  * 1. El campo 'appointment_date' es obligatorio y debe ser una fecha valida.
  * 2. El campo 'start_hour' es obligatorio y debe ser una hora valida.
  * 3. El campo 'pet_id' es obligatorio y debe ser un numero entero positivo y que exista en la tabla de mascotas.
  * 4. El campo 'room_id' es obligatorio y debe ser un numero entero positivo y que exista en la tabla de salas.
  * 5. El campo 'veterinarian_dni' es obligatorio y debe ser una cadena de texto y tener 9 caracteres.
  */
const validateAddAppointment = [
    body('appointment_date')
        .trim()
        .notEmpty().withMessage('appointment_date is required')
        .isDate().withMessage('appointment_date must be a date'),
    
    body('start_hour')
        .trim()
        .notEmpty().withMessage('start_hour is required')
        .isTime().withMessage('start_hour must be a time'),

    body('pet_id')
        .trim()
        .notEmpty().withMessage('pet_id is required')
        .isInt({ gt: 0 }).withMessage('pet_id must be a positive integer'),

    body('room_id')
        .trim()
        .notEmpty().withMessage('room_id is required')
        .isInt({ gt: 0 }).withMessage('room_id must be a positive integer'),

    body('veterinarian_dni')
        .trim()
        .notEmpty().withMessage('veterinarian_dni is required')
        .isString().withMessage('veterinarian_dni must be a string')
        .isLength({min: 9, max: 9}).withMessage('veterinarian_dni must be exactly 9 characters'),

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
    validateAddAppointment,
    validateUpdateAppointment
}