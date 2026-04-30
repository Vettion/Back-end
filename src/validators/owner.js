//Archivo de validación para el propietario de la mascota
const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');


/**
 * Cadena de validaciones para operaciones que requieren el dni del dueño.
 * Se aplica a rutas dinamicas como GET /vettion/owners/:dni.
 * * Reglas:
 * 1. El parametro 'dni_owner' debe existir en la URL.
 * 2. El parametro 'dni_owner' debe ser un string.
 */
const validateOwnerId = [
    param('dni_owner')
        .trim()
        .notEmpty().withMessage('dni_owner is required')
        .matches(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i).withMessage('dni_owner format is invalid'),

    validateResult
];

/**
 * Cadena de validaciones para el registro de un nuevo dueño.
 * Se aplica a la ruta de POST /vettion/owners.
 * * Reglas: 
 * 1. El campo 'name' es obligatorio y debe ser una cadena de texto y tener entre 2 y 100 caracteres.
  * 2. El campo 'surname' es obligatorio y debe ser una cadena de texto y tener entre 2 y 100 caracteres.
  * 3. El campo 'phone' es obligatorio y debe ser una cadena de texto y tener entre 2 y 15 caracteres.
  */
const validateAddOwner = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

    body('surname')
        .trim()
        .notEmpty().withMessage('Surname is required')
        .isString().withMessage('Surname must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('Surname must be between 2 and 100 characters'),
        
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone is required')
        .isString().withMessage('Phone must be a string')
        .isLength({ min: 10, max: 15 }).withMessage('Phone must be between 10 and 15 characters'),

    validateResult
];

/**
 * Cadena de validaciones para la actualizacion completa de un dueño.
 * Se aplica a la ruta PUT /vettion/owners/:dni_owner.
 * * Reglas:
 * 1. El parametro 'dni_owner' debe existir en la URL y ser un string.
 * 2. El cuerpo de la peticion debe cumplir las mismas reglas que la creacion (POST)
 */
const validateUpdateOwner = [
    param('dni_owner')
        .notEmpty().withMessage('dni_owner is required')
        .isString().withMessage('dni_owner must be a string')
        .isLength({ min: 9, max: 9 }).withMessage('dni_owner must be 9 characters long'),

    ...validateAddOwner.slice(0, -1),

    validateResult
]

module.exports = {
    validateOwnerId,
    validateAddOwner,
    validateUpdateOwner
};

