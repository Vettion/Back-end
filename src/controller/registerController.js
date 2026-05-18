const { findAllRegisters, findAllRegistersbyPetId } = require("../service/registerService");

/**
 * Función para obtener el listado de todos los registros.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 200 y un array de registros.
 */
const getAllRegisters = async (req, res, next) => {
    try {
        const registers = await findAllRegisters();
        res.status(200).json({
            code: 200,
            title: "success",
            message: "Registers retrieved successfully",
            data: registers,
        });
    }
    catch (error) {
        next(error);
    }
}

/**
 * Función para obtener el listado de todos los registros asociados a una mascota.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 200 y un array de registros asociados a una mascota
 *  o en un error 404 si no se encuentra la mascota.
 */
const getRegistersByPetId = async (req, res, next) => {
    try {
        const { id_pet } = req.params;
        const register = await findAllRegistersbyPetId(id_pet);
        if (!register) {
            res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Registers for pet with id ${id_pet} not found`
            });
        }
        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Registers retrieved successfully',
            data: register
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    getAllRegisters,
    getRegistersByPetId
}