const db = require('../configuration/database.js').db;
const { formatDate } = require('../utils/dateUtil.js');

/**
 * Obtiene todos los registros de la base de datos
 * @returns {Promise<Array>} - Array de objetos limpiador.
 */
const findAllRegisters = async () => {
    const registers = await db('register').select("*");
    const registerFormat = registers.map(r => ({ ...r, date_service: formatDate(r.date_service) }));
    return registerFormat;
}

/**
 * Obtiene todos los registros de la base de datos por id de la mascota
 * @returns {Promise<Array>} - Array de objetos limpiador.
 */
const findAllRegistersbyPetId = async (id_pet) => {
    const register = await db('register').select("*").where({ pet_id: id_pet });
    const registerFormat = register.map(r => ({ ...r, date_service: formatDate(r.date_service) }));
    return registerFormat;
}

module.exports = {
    findAllRegisters,
    findAllRegistersbyPetId
}