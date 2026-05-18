//Archivo de validación para el registro
const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');

/**
 * Cadena de validaciones para operaciones que requieren el id de la mascota.
 * Se aplica a rutas dinamicas como GET /vettion/registers/pet/:id_pet.
 * * Reglas:
 * 1. El parametro 'id_pet' debe existir en la URL.
 * 2. El parametro 'id_pet' debe ser un string.
 */
const validateRegisterIdPet = [
    param('id_pet')
        .notEmpty().withMessage('id_pet is required')
        .isInt({ gt: 0 }).withMessage('id_pet must be a positive integer'),

    validateResult
];

module.exports = {
    validateRegisterIdPet
}