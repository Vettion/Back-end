// Archivo de validaciones para alergias

const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');

/**
 * Cadena de validaciones para operaciones que requieren un Id de alergia.
 * Se aplica a rutas dinamicas como GET /:id.
 * * Reglas:
 * 1. El parametro 'id_allergy' debe existir en la URL.
 * 2. El parametro 'id_allergy' debe ser un numero entero mayor que 0.
 */
const validatePathologyId = [
    param('id_pathology')
        .notEmpty().withMessage('id_pathology is required')
        .isInt({ gt: 0 }).withMessage('id_pathology must be a positive integer'),

    validateResult
];

const validatePathologyPetId= [
    param('pet_id')
        .notEmpty().withMessage('pet_id is required')
        .isInt({ gt: 0 }).withMessage('pet_id must be a positive integer'),

    validateResult
];

/**
 * Cadena de validaciones para la creacion de una nueva alergia.
 * Se aplica a la ruta de POST /.
 * * Reglas: 
 * 1. El campo 'name' es obligatorio y debe ser una cadena de texto y tener entre 2 y 100 caracteres.
 * 2. El campo 'description' es obligatorio y debe ser una cadena de texto y tener al menos 2 caracteres.
 */
const validateAddPathology = [
    body('name')
        .trim()
        .notEmpty().withMessage('name is required')
        .isString().withMessage('name must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('name must be between 2 and 100 characters'),

    body('type')
        .trim()
        .notEmpty().withMessage('type is required')
        .isString().withMessage('type must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('type must be between 2 and 100 characters'),

    body('severity_level')
        .trim()
        .notEmpty().withMessage('severity_level is required')
        .isString().withMessage('severity_level must be a string')
        .isLength({ min: 2, max: 20 }).withMessage('severity_level must be between 2 and 100 characters'),

    body('treatment')
        .trim()
        .notEmpty().withMessage('treatment is required')
        .isString().withMessage('treatment must be a string')
        .isLength({ min: 2}).withMessage('emergency_treatment must be at least 2 characters.'),

    body('detection_date')
        .trim()
        .notEmpty().withMessage('detection_date is required')
        .isDate().withMessage('detection_date must be a date'),

    validateResult
];

/**
 * Cadena de validaciones para la actualizacion de una alergia existente.
 * Se aplica a la ruta de PUT /:id.
 * * Reglas:
 * 1. El parametro 'id_allergy' debe existir en la URL y ser un numero entero mayor que 0.
 * 2. El cuerpo de la peticion debe cumplir las mismas reglas que la creacion (POST)
 */
const validateUpdatePathology = [
    param('id_pathology')
        .notEmpty().withMessage('id_pathology is required')
        .isInt({ gt: 0 }).withMessage('id_pathology must be a positive integer'),

    ...validateAddPathology.slice(0, -1),

    validateResult
];

module.exports = {
    validatePathologyId,
    validatePathologyPetId,
    validateAddPathology,
    validateUpdatePathology
}