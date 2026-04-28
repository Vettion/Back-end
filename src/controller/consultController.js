// Este archivo implementa las operaciones que se han definido en el router/consultRouter.js

const { findAllConsults } = require('../service/consultService.js')

const getAllConsults = async (req, res, next) => {
    try {
        const consults = await findAllConsults();

        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Consult retrieved successfully',
            data: consults
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    getAllConsults
}