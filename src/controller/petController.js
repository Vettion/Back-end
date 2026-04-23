// Este archivo implementa las operaciones que se han definido en el /router/petsRouter.js

const { findAllPets, findPetById } = require('../service/petService.js');

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

module.exports = {
    getAllPets,
    getPetById
}