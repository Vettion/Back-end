// Este archivo implementa las operaciones que se han definido en el /service/allergyService.js
const { findAllAllergies, findAllergyById } = require('../service/allergyService.js');

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

module.exports = {
    getAllAllergies,
    getAllergyById
};