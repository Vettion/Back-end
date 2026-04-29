// Archivo de validaciones para consultas

const { param } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');

const validateConsultId = [
    param('id')
        .notEmpty().withMessage('id is required')
        .isInt({ gt: 0 }).withMessage('id must be a positive integer'),
    
    validateResult
];

module.exports = {
    validateConsultId
};