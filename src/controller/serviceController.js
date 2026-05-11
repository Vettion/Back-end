// Este archivo implementa las operaciones que se han definido en el router/serviceRouter.js

const { findAllServices, findServiceById } = require('../service/serviceService.js')

/**
 * Obtiene el listado completo de los servicios.
 * Devuelve un JSON estandarizado con el array de servicios.
 * @param {*} req - Objeto de solicitud.
 * @param {*} res - Objeto de respuesta.
 * @param {*} next - Funcion middleware para manejo de errores.
 * @returns {Promise<void>} - Devuelve una respuesta JSON con codigo 200 y los datos.
 */
const getAllServices = async (req, res, next) => {
    try {
        const services = await findAllServices();

        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Service retrieved successfully',
            data: services
        });
    } catch(error) {
        next(error);
    }
}

/**
 * Obtiene el detalle del servicio especifica por su id.
 * Valida si el servicio existe antes de devolver la respuesta.
 * @param {*} req - Objeto de solicitud.
 * @param {*} res - Objeto de respuesta.
 * @param {*} next - Funcion middleware para manejo de errores.
 * @returns {Promise<void>} - Devuelve una respuesta JSON con codigo 200 y los datos del servicio o 404 si no existe.
 */
const getServiceById = async (req, res, next) => {
    try{
        const { id_service } = req.params;
        const service = await findServiceById(id_service);

        if(!service) {
            return res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Service with id ${id_service} not found.`
            });
        }

        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Service retrieved successfully',
            data: service
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllServices,
    getServiceById
}