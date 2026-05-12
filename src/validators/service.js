// Archivo de validaciones para servicios

const { param } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');

/**
 * Cadena de validaciones para operaciones que requieren un Id de servicio.
 * Se aplica a rutas dinamicas como GET /:id.
 * * Reglas:
 * 1. El parametro 'id_service' debe existir en la URL.
 * 2. El parametro 'id_service' debe ser un numero entero mayor que 0.
 */
const validateServiceId = [
    param('id_service')
        .notEmpty().withMessage('id_service is required')
        .isInt({ gt: 0 }).withMessage('id_service must be a positive integer'),
    
    validateResult
];

module.exports = {
    validateServiceId
};