// Este archivo implementa las operaciones que se han definido en el /router/ownerRouter.js

const { findAllOwners, findOwnerByDni, addOwner, updateOwner, removeOwner } = require('../service/ownerService');

/**
 * Función para obtener el listado de todos los dueños.
 * Devuelve un Json estandarizado con el array de dueños.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON con código 200 y un array de dueños.
 */
const getAllOwners = (async (req, res, next) => {
    try {
        const owners = await findAllOwners();
        res.status(200).json({
            code: 200, 
            title: 'success',
            message: 'Owners retrieved successfully',
            data: owners
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Función para obtener un dueño por su dni.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON con código 200 y los datos del dueño de ese dni.
 */
const getOwner = (async (req, res) => {
    const dni_owner = req.params.dni_owner;

    if (! await ownerExistsByDni(dni_owner)) {
        return res.status(404).json({
            code: 404,
            title: 'not found',
            message: 'The owner has not been found'
        });
    }

    const owner = await findOwner(dni_owner);
    res.status(200).json(owner);
});

/**
 * Función para añadir un nuevo dueño.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON con código 201 y un mensaje de éxito o 
 * un JSON con código 409 y un mensaje de conflicto.
 */
const postOwner = (async (req, res) => {
    const dni_owner = req.body.dni_owner;

    if (await ownerExistsByDni(dni_owner)) {
        return res.status(409).json({
            code: 409,
            title: 'conflict',
            message: 'The owner is already on the database.'
        });
    }

    const name = req.body.name;
    const surname = req.body.surname;
    const phone = req.body.phone;
    const email = req.body.email;

    await addOwner(dni_owner, name, surname, phone, email);

    res.status(201).json({
        code: 201,
        title: 'added',
        message: 'The owner has been added correctly.'
    });
});

/**
 * Función para editar un dueño existente.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON con código 204 y un mensaje de éxito o 
 * un JSON con código 404 y un mensaje de no encontrado.
 */
const putOwner = (async (req, res) => {
    const dni_owner = req.params.dni_owner;

    if (!await ownerExistsByDni(dni_owner)){
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'The owner has not been found.'
        });
    }

    const name= req.body.name;
    const surname= req.body.surname;
    const phone= req.body.phone;
    const email= req.body.email;

    await editOwner(dni_owner, name, surname, phone, email);
    res.status(204).end();
});

/**
 * Función para eliminar un dueño.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON con código 204 o 
 * un JSON con código 404 y un mensaje de no encontrado.
 */
const deleteOwner=(async (req, res) => {
    const dni_owner = req.params.dni_owner;

    if(!await ownerExistsByDni(dni_owner)){
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'The owner has not been found.'
        });
    }

    await removeOwner(dni_owner);
    res.status(204).end();
});

module.exports = {
    getOwners,
    getOwner,
    postOwner,
    putOwner,
    deleteOwner
}