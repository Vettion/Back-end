const db = require('../configuration/database.js').db;

/**
 * Obtiene todos los veterinarios de la base de datos, ordenados alfabéticamente por apellido.
 * @returns {Promise<Array>} - Array de objetos veterinario.
 */
const findAllVeterinarians = async () => {
    return await db('veterinarian')
        .select('dni_veterinarian', 'name', 'surname', 'speciality')
        .orderBy('surname', 'asc');
};

module.exports = { findAllVeterinarians };
