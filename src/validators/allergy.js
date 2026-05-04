// Archivo de validaciones para mascotas

const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');

/**
 * Cadena de validaciones para operaciones que requieren un Id de alergia.
 * Se aplica a rutas dinamicas como GET /:id.
 * * Reglas:
 * 1. El parametro 'id_allergy' debe existir en la URL.
 * 2. El parametro 'id_allergy' debe ser un numero entero mayor que 0.
 */
const validateAllergyId = [
    param('id_allergy')
        .notEmpty().withMessage('id_allergy is required')
        .isInt({ gt: 0 }).withMessage('id_allergy must be a positive integer'),

    validateResult
];

/**
 * Cadena de validaciones para la creacion de una nueva alergia.
 * Se aplica a la ruta de POST /.
 * * Reglas: 
 * 1. El campo 'name' es obligatorio y debe ser una cadena de texto y tener entre 2 y 100 caracteres.
 * 2. El campo 'description' es obligatorio y debe ser una cadena de texto y tener al menos 2 caracteres.
 */
const validateAddAllergy = [
    body('name')
        .trim()
        .notEmpty().withMessage('name is required')
        .isString().withMessage('name must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('name must be between 2 and 100 characters'),

    body('description')
        .trim()
        .notEmpty().withMessage('description is required')
        .isString().withMessage('description must be a string')
        .isLength({ min: 2 }).withMessage('description must be at least 2 characters long'),

    validateResult
];

/**
 * Cadena de validaciones para la actualizacion de una alergia existente.
 * Se aplica a la ruta de PUT /:id.
 * * Reglas:
 * 1. El parametro 'id_allergy' debe existir en la URL y ser un numero entero mayor que 0.
 * 2. El cuerpo de la peticion debe cumplir las mismas reglas que la creacion (POST)
 */
const validateUpdateAllergy = [
    param('id_allergy')
        .notEmpty().withMessage('id_allergy is required')
        .isInt({ gt: 0 }).withMessage('id_allergy must be a positive integer'),

    ...validateAddAllergy.slice(0, -1),

    validateResult
];

module.exports = {
    validateAllergyId,
    validateAddAllergy,
    validateUpdateAllergy
}