// Este archivo implementa las operaciones que se han definido en el router/consultRouter.js

const { findAllConsults, findConsultById } = require('../service/consultService.js')

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

const getConsultById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const consult = await findConsultById(id);

        if(!consult) {
            return res.status(404).json({
                code: 404,
                title: 'not found',
                message: `Consult with id ${id} not found.`
            });
        }

        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Consult retrieved successfully',
            data: consult
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllConsults,
    getConsultById
}