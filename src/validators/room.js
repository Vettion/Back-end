// Archivo de validaciones para salas

const { param } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult.js');

const validateRoomCode = [
    param('code_room')
        .notEmpty().withMessage('code_room is required')
        .isString().withMessage('code_room must be a string'),

    validateResult
];

module.exports = {
    validateRoomCode
};