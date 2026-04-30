// Archivo de validaciones para consultas

const { param } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');

/**
 * Cadena de validaciones para operaciones que requieren un Id de consulta.
 * Se aplica a rutas dinamicas como GET /:id.
 * * Reglas:
 * 1. El parametro 'id_consult' debe existir en la URL.
 * 2. El parametro 'id_consult' debe ser un numero entero mayor que 0.
 */
const validateConsultId = [
    param('id_consult')
        .notEmpty().withMessage('id_consult is required')
        .isInt({ gt: 0 }).withMessage('id_consult must be a positive integer'),
    
    validateResult
];

module.exports = {
    validateConsultId
};