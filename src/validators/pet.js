// Archivo de validaciones

const { param, body } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js')

const validatePetId = [
    param('id')
        .notEmpty().withMessage('id is required')
        .isInt({ gt: 0 }).withMessage('id must be a positive integer'),
    
    validateResult
];

const validateAddPet = [
    body('name')
        .trim()
        .notEmpty().withMessage('name is required')
        .isString().withMessage('name must be a string')
        .isLength({min: 2, max: 100}).withMessage('name must be between 2 and 100 characters'),
    
    body('type')
        .trim()
        .notEmpty().withMessage('type is required')
        .isString().withMessage('type must be a string')
        .isLength({min: 2, max: 100}).withMessage('type must be between 2 and 100 characters'),

    body('race')
        .trim()
        .notEmpty().withMessage('race is required')
        .isString().withMessage('race must be a string')
        .isLength({min: 2, max: 100}).withMessage('race must be between 2 and 100 characters'),

    body('weight')
        .trim()
        .notEmpty().withMessage('weight is required')
        .isFloat({ min: 0.1}).withMessage('weight must be a positive number'),

    body('sex')
        .trim()
        .notEmpty().withMessage('sex is required')
        .isString().withMessage('sex must be a string')
        .isLength({min: 2, max: 100}).withMessage('sex must be between 2 and 100 characters'),

    body('age')
        .trim()
        .notEmpty().withMessage('age is required')
        .isInt({ min: 0}).withMessage('age must be a positive number'),

    body('owner_dni')
        .trim()
        .notEmpty().withMessage('owner_dni is required')
        .matches(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i).withMessage('owner_dni format is invalid'),
    
    validateResult
]

const validateUpdatePet = [
    param('id')
        .notEmpty().withMessage('id is required')
        .isInt({ gt: 0 }).withMessage('id must be a positive integer'),

    ...validateAddPet.slice(0, -1),

    validateResult
]

module.exports = {
    validatePetId,
    validateAddPet,
    validateUpdatePet
}