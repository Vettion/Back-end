// Archivo de validaciones para mascotas

const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js')

/**
 * Cadena de validaciones para operaciones que requieren un Id de mascota.
 * Se aplica a rutas dinamicas como GET /:id.
 * * Reglas:
 * 1. El parametro 'id_pet' debe existir en la URL.
 * 2. El parametro 'id_pet' debe ser un numero entero mayor que 0.
 */
const validatePetId = [
    param('id_pet')
        .notEmpty().withMessage('id_pet is required')
        .isInt({ gt: 0 }).withMessage('id_pet must be a positive integer'),
    
    validateResult
];

 /**
  * Cadena de validaciones para la creacion de una nueva mascota.
  * Se aplica a la ruta de POST /.
  * * Reglas: 
  * 1. El campo 'name_pet' es obligatorio y debe ser una cadena de texto y tener entre 2 y 100 caracteres.
  * 2. El campo 'type' es obligatorio y debe ser una cadena de texto y tener entre 2 y 100 caracteres.
  * 3. El campo 'breed' es obligatorio y debe ser una cadena de texto y tener entre 2 y 100 caracteres.
  * 4. El campo 'weight' es obligatorio y debe ser un numero decimal (float) y ser mayor de 0.1 minimo.
  * 5. El campo 'sex' es obligatorio y debe ser una cadena de texto y tener entre 2 y 100 caracteres.
  * 6. El campo 'birth_date' es obligatorio y debe ser una fecha valida.
  * 7. El campo 'owner_dni' es obligatorio y debe ser una combinacion valida de DNI español. 
  * 8. El campo 'allergies' es opcional y debe ser un array de enteros.
  */
const validateAddPet = [
    body('name_pet')
        .trim()
        .notEmpty().withMessage('name is required')
        .isString().withMessage('name must be a string')
        .isLength({min: 2, max: 100}).withMessage('name must be between 2 and 100 characters'),
    
    body('type')
        .trim()
        .notEmpty().withMessage('type is required')
        .isString().withMessage('type must be a string')
        .isLength({min: 2, max: 100}).withMessage('type must be between 2 and 100 characters'),

    body('weight')
        .trim()
        .notEmpty().withMessage('weight is required')
        .isFloat({ min: 0.1}).withMessage('weight must be a positive number'),

    body('sex')
        .trim()
        .notEmpty().withMessage('sex is required')
        .isString().withMessage('sex must be a string')
        .isLength({min: 2, max: 100}).withMessage('sex must be between 2 and 100 characters'),

    body('birth_date')
        .trim()
        .notEmpty().withMessage('birth_date is required')
        .isDate().withMessage('birth_date must be a valid date'),

    body('owner_dni')
        .trim()
        .notEmpty().withMessage('owner_dni is required')
        .matches(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i).withMessage('owner_dni format is invalid'),
    
    body('allergies')
        .optional()
        .isArray().withMessage('allergies must be an array')
        .custom((value) => {
            if(!value.every(Number.isInteger)) {
                throw new Error('Allergy IDs must be integers');
            }
            return true;
        }),

    validateResult
]

/**
 * Cadena de validaciones para la actualizacion completa de una mascota.
 * Se aplica a la ruta PUT /:id.
 * * Reglas:
 * 1. El parametro 'id' debe existir en la URL y ser un numero entero positivo.
 * 2. El cuerpo de la peticion debe cumplir las mismas reglas que la creacion (POST)
 */
const validateUpdatePet = [
    param('id_pet')
        .notEmpty().withMessage('id_pet is required')
        .isInt({ gt: 0 }).withMessage('id_pet must be a positive integer'),

    ...validateAddPet.slice(0, -1),

    validateResult
]

module.exports = {
    validatePetId,
    validateAddPet,
    validateUpdatePet
}