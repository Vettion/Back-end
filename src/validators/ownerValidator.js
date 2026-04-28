//Archivo de validación para el propietario de la mascota
const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');
const { isStringObject } = require('node:util/types');


/**
 * Cadena de validaciones para operaciones que requieren el dni del dueño.
 * Se aplica a rutas dinamicas como GET /vettion/owners/:dni.
 * * Reglas:
 * 1. El parametro 'id' debe existir en la URL.
 * 2. El parametro 'id' debe ser un numero entero mayor que 0.
 */
const validateOwnerId = [
    param('dni_owner')
    .notEmpty().withMessage('dni is required')
        .isInt().withMessage('dni must be a positive integer'),

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
 * Cadena de validaciones para la actualizacion completa de una consola.
 * Se aplica a la ruta PUT /vettion/pets/:dni.
 * * Reglas:
 * 1. El parametro 'dni_owner' debe existir en la URL y ser un numero entero positivo.
 * 2. El cuerpo de la peticion debe cumplir las mismas reglas que la creacion (POST)
 */
const validateUpdatePet = [
    param('dni_owner')
        .notEmpty().withMessage('dni_owner is required')
        .isInt({ gt: 0 }).withMessage('dni_owner must be a positive integer'),

    ...validateAddOwner.slice(0, -1),

    validateResult
]

module.exports = {
    validateOwnerId,
    validateAddOwner,
    validateUpdatePet
};

