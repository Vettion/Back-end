// Este archivo implementa las operaciones que se han definido en el /router/petsRouter.js

const { findAllPets, findPetById, addPet, updatePet, removePet } = require('../service/petService.js');

/**
 * Obtiene el listado completo de los animales.
 * Devuelve un JSON estandarizado con el array de mascotas.
 * @param {*} req - Objeto de solicitud.
 * @param {*} res - Objeto de respuesta.
 * @param {*} next - Funcion para pasar el control al siguiente middleware.
 * @returns {Promise<void>} - Devuelve una respuesta JSON con codigo 200 y los datos.
 */
const getAllPets = async (req, res, next) => {
    try {
        const pets = await findAllPets();
        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Pets retrieved successfully',
            data: pets
        });
    } catch (error) {
        next(error);
    }
}

 /**
  * Obtiene el detalle del animal especifico por su id.
  * Valida si la mascota existe antes de devolver la respuesta.
  * @param {*} req - Objeto de solicitud.
  * @param {*} res - Objeto de respuesta.
  * @param {*} next - Funcion middleware para manejo de errores.
  * @returns {Promise<void>} - Devuelve una respuesta JSON con codigo 200 y los datos de la mascota o 404 si no existe.
  */
const getPetById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pet = await findPetById(id);
        if (!pet) {
            return res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Pet with id ${id} not found`
            })
        }
        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Pet retrieved successfully',
            data: pet
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Añade una nueva mascota.
 * Recibe los datos validados en el cuerpo de la peticion.
 * @param {*} req - Objeto de peticion.
 * @param {*} res - Objeto de respuesta.
 * @param {*} next - Funcion middleware para manejo de errores
 * @returns {Promise<void>} - Devuelve una respuesta JSON con codigo 201 y los datos de la nueva mascota.
 */
const postPet = async (req, res, next) => {
    try {
        const newId = await addPet(req.body);
        const newPet = {
            id: newId,
            ...req.body
        };
        res.status(201).json({
            code: 201,
            title: 'created',
            message: 'Pet created successfully',
            data: newPet
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Actualiza los datos de una mascota por su id.
 * Reemplaza los datos de una mascota con los dados en el cuerpo de la peticion.
 * @param {*} req - Objeto de peticion.
 * @param {*} res - Objeto de respuesta.
 * @param {*} next - Funcion middleware para manejo de errores.
 * @returns {Promise<void>} - Devuelve una respuesta JSON con codigo 200 y los datos de la mascota actualizada, o en un error 404 si no se encuentra la mascota.
 */
const putPet = async (req, res, next) => {
    try {
        const { id } = req.params;
        const petData = req.body;

        await updatePet(id, petData);

        const updatedPet = await findPetById(id);

        if(!updatedPet) {
            return res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Pet with id ${id} not found after update`
            });
        }

        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Pet updated successfully',
            data: updatedPet
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Elimina una mascota por su id.
 * @param {*} req - Objeto de la peticion.
 * @param {*} res - Objeto de la respuesta.
 * @param {*} next - Funcion middleware para manejo de errores
 * @returns {Promise<void>} - Devuelve una respuesta JSON con codigo 200 si la mascota ha sido eliminada, o 404 si no se encuentra la mascota
 */
const deletePet = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteCount = await removePet(id);

        if(deleteCount === 0) {
            return res.status(404).json({
                code: 404, 
                title: 'not found', 
                message: `Pet with id ${id} not found`
            });
        }

        res.status(200).json({
            code: 200,
            title: 'success',
            message: `Pet with id ${id} deleted successfully`
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    getAllPets,
    getPetById,
    postPet,
    putPet,
    deletePet
}