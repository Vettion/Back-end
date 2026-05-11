const { findAllVeterinarians } = require('../service/veterinarianService.js');

/**
 * Obtiene el listado completo de los veterinarios.
 * @param {*} req - Objeto de solicitud.
 * @param {*} res - Objeto de respuesta.
 * @param {*} next - Función middleware para manejo de errores.
 */
const getAllVeterinarians = async (req, res, next) => {
    try {
        const veterinarians = await findAllVeterinarians();
        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Veterinarians retrieved successfully',
            data: veterinarians
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllVeterinarians };
