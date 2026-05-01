const db = require('../configuration/database.js').db;
const { homedir, platform } = require('os');

/**
 * Función para obtener todos los dueños de la base de datos.
 * @returns 
 */
const findAllOwners = async () => {
    const owners = await db('owner')
        .select(
            'dni_owner',
            'name',
            'surname',
            'phone',
            'email'
    );

    return owners;
};

/**
 * Función para obtener un dueño por su dni.
 * @param {*} dni_owner 
 * @returns 
 */
const findOwner = (async (dni_owner) => {
    return await db('owner').select('*').where({ dni_owner: dni_owner }).first();
});

/**
 * Función para comprobar si un dueño existe por su dni.
 * @param {*} dni_owner 
 * @returns 
 */
const ownerExistsByDni = async (dni_owner) => {
    const owner = await db('owner').where('dni_owner', dni_owner).first();
    return owner != null;
}

/**
 * Función para añadir un nuevo dueño a la base de datos.
 * @param {*} dni_owner 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} phone 
 * @param {*} email 
 * @returns 
 */
const addOwner = (async (dni_owner, name, surname, phone, email) => {
    return await db('owner').insert({
        dni_owner: dni_owner,
        name: name,
        surname: surname,
        phone: phone,
        email: email
    });
});

/**
 * Función para editar un dueño existente en la base de datos.
 * @param {*} dni_owner 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} phone 
 * @param {*} email 
 * @returns 
 */
const editOwner = (async (dni_owner, name, surname, phone, email) => {
    return await db('owner').where({ dni_owner: dni_owner }).update({
        name: name,
        surname: surname,
        phone: phone,
        email: email
    });
});

/**
 * Función para eliminar un dueño de la base de datos.
 * @param {*} dni_owner 
 * @returns 
 */
const removeOwner = (async (dni_owner) => {
    return await db('owner').where({ dni_owner: dni_owner }).del();
});

module.exports = {
    findAllOwners,
    findOwner,
    addOwner,
    editOwner,
    removeOwner,
    ownerExistsByDni
}