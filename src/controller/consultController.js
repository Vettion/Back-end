// Este archivo implementa las operaciones que se han definido en el router/consultRouter.js

const { findAllConsults, findConsultById } = require('../service/consultService.js')

/**
 * Obtiene el listado completo de las consultas.
 * Devuelve un JSON estandarizado con el array de consultas.
 * @param {*} req - Objeto de solicitud.
 * @param {*} res - Objeto de respuesta.
 * @param {*} next - Funcion middleware para manejo de errores.
 * @returns {Promise<void>} - Devuelve una respuesta JSON con codigo 200 y los datos.
 */
const getAllConsults = async (req, res, next) => {
    try {
        const consults = await findAllConsults();

        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Consult retrieved successfully',
            data: consults
        });
    } catch(error) {
        next(error);
    }
}

/**
 * Obtiene el detalle de la consulta especifica por su id.
 * Valida si la consulta existe antes de devolver la respuesta.
 * @param {*} req - Objeto de solicitud.
 * @param {*} res - Objeto de respuesta.
 * @param {*} next - Funcion middleware para manejo de errores.
 * @returns {Promise<void>} - Devuelve una respuesta JSON con codigo 200 y los datos de la consulta o 404 si no existe.
 */
const getConsultById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const consult = await findConsultById(id);

        if(!consult) {
            return res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Consult with id ${id} not found.`
            });
        }

        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Consult retrieved successfully',
            data: consult
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllConsults,
    getConsultById
}