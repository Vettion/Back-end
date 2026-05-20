const { findAllCleaners } = require('../service/cleanerService.js');

/**
 * Obtiene el listado completo del personal de limpieza.
 * @param {*} req - Objeto de solicitud.
 * @param {*} res - Objeto de respuesta.
 * @param {*} next - Función middleware para manejo de errores.
 */
const getAllCleaners = async (req, res, next) => {
    try {
        const cleaners = await findAllCleaners();
        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Cleaners retrieved successfully',
            data: cleaners
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllCleaners };
