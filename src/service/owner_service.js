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

module.exports = {
    findAllOwners,
    findOwner,
    ownerExistsByDni
}