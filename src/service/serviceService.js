// Archivo en el que accedemos a la base de datos a por la informacion requerida y realizamos las operaciones de logica necesaria.

const db = require('../configuration/database.js').db;

/**
 * Metodo para obtener todas los servicios de la base de datos.
 * @returns {Promise <Array>} - Devuelve una promesa que resulve en un array de objetos (servicios).
 */
const findAllServices = async () => {
    const services = await db('service')
        .select(
            'id_service',
            'name',
            'service_type',
            'duration',
            'base_price',
            'description'
        );
    return services;
};

/**
 * Metodo para obtener un servicio por su id.
 * @param {number} id - El id del servicio a buscar.
 * @returns {Promise<Object|null>} Devuelve una promesa que resuelve en un objeto (servicio) o null si no se encuentra el servicio.
 */
const findServiceById = async (id) => {
    return await db('service')
        .where({ id_service: id})
        .first();
}

module.exports = {
    findAllServices,
    findServiceById
}