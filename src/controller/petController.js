// Este archivo implementa las operaciones que se han definido en el /router/petsRouter.js

const { findAllPets, findPetById, addPet, updatePet } = require('../service/petService.js');

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

module.exports = {
    getAllPets,
    getPetById,
    postPet,
    putPet
}