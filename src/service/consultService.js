// Archivo en el que accedemos a la base de datos a por la informacion requerida y realizamos las operaciones de logica necesaria.

const db = require('../configuration/database.js').db;

/**
 * Metodo para obtener todas las consultas de la base de datos.
 * @returns {Promise <Array>} - Devuelve una promesa que resulve en un array de objetos (consultas).
 */
const findAllConsults = async () => {
    const consults = await db('consult')
        .select(
            'id_consult',
            'name',
            'consult_type',
            'duration',
            'base_price',
            'description'
        );
    return consults;
};

/**
 * Metodo para obtener una consulta por su id.
 * @param {number} id - El id de la consulta a buscar.
 * @returns {Promise<Object|null>} Devuelve una promesa que resuelve en un objeto (consulta) o null si no se encuentra la consulta.
 */
const findConsultById = async (id) => {
    return await db('consult')
        .where({ id_consult: id})
        .first();
}

module.exports = {
    findAllConsults,
    findConsultById
}