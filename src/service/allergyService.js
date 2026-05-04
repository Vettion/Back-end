// Archivo en el que accedemos a la base de datos a por la informacion requerida y realizamos las operaciones de logica necesaria.
const db = require('../configuration/database.js').db;

/**
 * Funcion para obtener todas las alergias de la base de datos.
 * @returns {Promise<Array>} Devuelve una promesa que resuelve en un array de objetos (alergias).
 */
const findAllAllergies = async () => {
    const allergies = await db('allergy').select('*');
    return allergies;
};

/**
 * Funcion para obtener una alergia por su id.
 * @param {number} id_allergy - El id de la alergia a buscar.
 * @returns {Promise<Object|null>} Devuelve una promesa que resuelve en un objeto (alergia) o null si no se encuentra.
 */
const findAllergyById = async (id_allergy) => {
    return await db('allergy')
        .where({ id_allergy: id_allergy })
        .first();
};

module.exports = {
    findAllAllergies,
    findAllergyById
}