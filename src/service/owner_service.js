const db = require('../configuration/database.js').db;
const { homedir, platform } = require('os');

const findAllOwners = (async () => {
    return await db('owner').select('*');
});

const findOwner = (async (dni) => {
    return await db('owner').select('*').where({ dni: dni }).first();
});

const ownerExistsByDni = async (dni) => {
    const owner = await db('owner').where('dni', dni).first();
    return owner != null;
}

const addOwner = (async (dni, name, surname, phone, email) => {
    return await db('owner').insert({
        dni: dni,
        name: name,
        surname: surname,
        phone: phone,
        email: email
    });
});

module.exports = {
    findAllOwners,
    findOwner,
    addOwner,
    ownerExistsByDni
}