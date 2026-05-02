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
const findOwnerByDni = async (dni_owner) => {
    return await db('owner')
        .where({ dni_owner: dni_owner })
        .first();
};

/**
 * Función para añadir un nuevo dueño a la base de datos.
 * @param {*} dni_owner 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} phone 
 * @param {*} email 
 * @returns 
 */
const addOwner = async (dni_owner, name, surname, phone, email) => {
    return await db('owner').insert({
        dni_owner,
        name,
        surname,
        phone,
        email
    });
};

/**
 * Función para editar un dueño existente en la base de datos.
 * @param {*} dni_owner 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} phone 
 * @param {*} email 
 * @returns 
 */
const updateOwner = async (dni_owner, name, surname, phone, email) => {
    return await db('owner').where({ dni_owner }).update({
        name,
        surname,
        phone,
        email
    });
};

/**
 * Función para eliminar un dueño de la base de datos.
 * @param {*} dni_owner 
 * @returns 
 */
const removeOwner = async (dni_owner) => {
    return await db('owner').where({ dni_owner: dni_owner }).del();
};

module.exports = {
    findAllOwners,
    findOwnerByDni,
    addOwner,
    updateOwner,
    removeOwner
}