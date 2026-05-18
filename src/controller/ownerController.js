// Este archivo implementa las operaciones que se han definido en el /service/ownerService.js

const { findAllOwners, findOwnerByDni, addOwner, updateOwner, removeOwner } = require('../service/ownerService');

/**
 * Función para obtener el listado de todos los dueños.
 * Devuelve un Json estandarizado con el array de dueños.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
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
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 200 y los datos del dueño de ese dni o 
 * un JSON con código 404 y un mensaje de no encontrado.
 */
const getOwnerByDni = async (req, res, next) => {
    try {
        const { dni_owner } = req.params;
        const owner = await findOwnerByDni(dni_owner);

        if(!owner) {
            return res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Owner with DNI ${dni_owner} not found`
            });
        }

        res.status(200).json({
            code: 200,
            title: 'success',
            message: `Owner with DNI ${dni_owner} retrieved successfully`,
            data: owner
        });
    } catch(error) {
        next(error);
    }
};

/**
 * Función para añadir un nuevo dueño.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 201 y un mensaje de éxito o 
 * un JSON con código 409 y un mensaje de conflicto.
 */
const postOwner = async (req, res, next) => {
    try {
        const { dni_owner, name_owner, surname, birth_date, phone, email, direction, floor, city, province, postal_code } = req.body;
        const existingOwner = await findOwnerByDni(dni_owner);

        if(existingOwner) {
            return res.status(409).json({
                code: 409,
                title: 'conflict',
                message: `Owner with DNI ${dni_owner} already exists`
            });
        }

        await addOwner(dni_owner, name_owner, surname, birth_date, phone, email, direction, floor, city, province, postal_code);
        const newOwner = await findOwnerByDni(dni_owner);

        res.status(201).json({
            code: 201,
            title: 'created',
            message: `Owner with dni ${dni_owner} created successfully`,
            data: newOwner
        });
    } catch(error) {
        next(error);
    }
};

/**
 * Función para editar un dueño existente.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 204 y un mensaje de éxito o 
 * un JSON con código 404 y un mensaje de no encontrado.
 */
const putOwner = async (req, res, next) => {
    try {
        const { dni_owner } = req.params;
        const { name_owner, surname, phone, email, direction, floor, city, province, postal_code } = req.body;

        const owner = await findOwnerByDni(dni_owner);
        if (!owner) {
            return res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Owner with DNI ${dni_owner} not found`
            });
        }

        await updateOwner(dni_owner, name_owner, surname, phone, email, direction, floor, city, province, postal_code);

        res.status(200).json({
            code: 200,
            title: 'success',
            message: `Owner with DNI ${dni_owner} updated successfully`,
            data: updateOwner
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Función para eliminar un dueño.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 204 o 
 * un JSON con código 404 y un mensaje de no encontrado.
 */
const deleteOwner = async (req, res, next) => {
    try {
        const { dni_owner } = req.params;
        const owner = await findOwnerByDni(dni_owner);

        if(!owner) {
            return res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Owner with DNI ${dni_owner} not found`
            });
        }

        await removeOwner(dni_owner);
        res.status(200).json({
            code: 200,
            title: 'success',
            message: `Owner with DNI ${dni_owner} deleted successfully`
        });
    } catch(error) {
        next(error);
    }
};

module.exports = {
    getAllOwners,
    getOwnerByDni,
    postOwner,
    putOwner,
    deleteOwner
}