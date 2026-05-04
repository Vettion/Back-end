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

/**
 * Funcion para agregar una nueva alergia.
 * @param {string} name - El nombre de la alergia.
 * @param {string} description - La descripcion de la alergia.
 * @returns {Promise<number>} Devuelve una promesa que resuelve en el id de la alergia agregada.
 */
const addAllergy = (async (allergyData) => {
    const { name, description } = allergyData;
    const [newId] = await db('allergy').insert({
        name,
        description
    });
    return newId;
});

/**
 * Función para actualizar una alergia existente.
 * @param {number} id_allergy - El id de la alergia a actualizar.
 * @param {Object} allergyData - Los datos de la alergia a actualizar.
 * @returns {Promise<void>} Devuelve una promesa que se resuelve cuando la alergia es actualizada.
 */
const updateAllergy = (async (id_allergy, allergyData) => {
    const { name, description } = allergyData;
    await db('allergy')
        .where({ id_allergy: id_allergy })
        .update({
            name,
            description
        });
});

/**
 * Función para eliminar una alergia.
 * @param {number} id_allergy - El id de la alergia a eliminar.
 * @returns {Promise<void>} Devuelve una promesa que se resuelve cuando la alergia es eliminada.
 */
const removeAllergy = (async (id_allergy) => {
    return await db('allergy')
        .where({ id_allergy: id_allergy })
        .del();
});

module.exports = {
    findAllAllergies,
    findAllergyById,
    addAllergy,
    updateAllergy,
    removeAllergy
};