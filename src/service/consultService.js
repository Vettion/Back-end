// Archivo en el que accedemos a la base de datos a por la informacion requerida y realizamos las operaciones de logica necesaria.

const db = require('../configuration/database.js').db;

const findAllConsults = async () => {
    const consults = await db('consult')
        .select(
            'id_consult',
            'name',
            'type',
            'duration',
            'price',
            'description'
        );
    return consults;
};

const findConsultById = async (id) => {
    return await db('consult')
        .where({ id_consult: id})
        .first();
}

module.exports = {
    findAllConsults,
    findConsultById
}