// Este archivo implementa las operaciones que se han definido en el /service/allergyService.js
const { findAllAllergies, findAllergyById, addAllergy } = require('../service/allergyService.js');

/**
 * Función para obtener el listado de todas las alergias.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 200 y un array de alergias.
 */
const getAllAllergies = (async (req, res, next) => {
    try {
        const allergies = await findAllAllergies();
        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Allergies retrieved successfully',
            data: allergies
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Función para obtener una alergia por su id.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 200 y un objeto (alergia) o un error 404 si no se encuentra.
 */
const getAllergyById = (async (req, res, next) => {
    try {
        const { id_allergy } = req.params;
        const allergy = await findAllergyById(id_allergy);

        if (!allergy) {
            return res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Allergy with id ${id_allergy} not found.`
            });
        }

        res.status(200).json({
            code: 200,
            title: 'success',
            message: `Allergy with id ${id_allergy} retrieved successfully.`,
            data: allergy
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Función para crear una nueva alergia.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 201 y el objeto (alergia) creado.
 */
const postAllergy = (async (req, res, next) => {
    try {
        const newId = await addAllergy(req.body);
        const newAllergy = await findAllergyById(newId);

        res.status(201).json({
            code: 201,
            title: 'created',
            message: 'Allergy created successfully',
            data: newAllergy
        });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    getAllAllergies,
    getAllergyById,
    postAllergy
};