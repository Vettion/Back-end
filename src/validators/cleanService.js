// Archivo de validaciones

const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');

/**
 * Cadena de validaciones para operaciones que requieren un Id de servicio de limpieza.
 * Se aplica a rutas dinamicas como GET /vettion/clean_services/:id_clean_service.
 * * Reglas:
 * 1. El parametro 'id_clean_service' debe existir en la URL.
 * 2. El parametro 'id_clean_service' debe ser un numero entero mayor que 0.
 */
const validateCleanServiceId = [
    param('id_clean_service')
        .notEmpty().withMessage('id_clean_service is required')
        .isInt({ gt: 0 }).withMessage('id_clean_service must be a positive integer'),
    
    validateResult
];

/**
 * Cadena de validaciones para la creacion de un nuevo servicio de limpieza.
 * Se aplica a la ruta de POST /vettion/appointments.
 * * Reglas:
 * 1. El campo 'cleaner_dni' es obligatorio, debe ser una cadena de texto y tener exactamente 9 caracteres.
 */
const validateAddCleanService = [
    body('cleaner_dni')
        .trim()
        .notEmpty().withMessage('cleaner_dni is required')
        .isString().withMessage('cleaner_dni must be a string')
        .isLength({ min: 9, max: 9 }).withMessage('cleaner_dni must be 9 characters long'),

    validateResult
];

/**
 * Cadena de validaciones para la actualizacion completa de un servicio de limpieza.
 * Se aplica a la ruta PUT /clean_services/:id_clean_service.
 * * Reglas:
 * 1. El parametro 'id_clean_service' debe existir en la URL y ser un numero entero positivo.
 * 2. El cuerpo de la peticion debe cumplir las mismas reglas que la creacion (POST)
 */
const validateUpdateCleanService = [
    param('id_clean_service')
        .notEmpty().withMessage('id_clean_service is required')
        .isInt({ gt: 0 }).withMessage('id_clean_service must be a positive integer'),

    ...validateAddCleanService.slice(0, -1),

    validateResult
]

module.exports = { 
    validateCleanServiceId, 
    validateAddCleanService,
    validateUpdateCleanService 
};