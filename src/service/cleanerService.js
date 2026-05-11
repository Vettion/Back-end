const db = require('../configuration/database.js').db;

/**
 * Obtiene todos los empleados de limpieza de la base de datos, ordenados alfabéticamente por apellido.
 * @returns {Promise<Array>} - Array de objetos limpiador.
 */
const findAllCleaners = async () => {
    return await db('cleaner')
        .select('dni_cleaner', 'name', 'surname')
        .orderBy('surname', 'asc');
};

module.exports = { findAllCleaners };
