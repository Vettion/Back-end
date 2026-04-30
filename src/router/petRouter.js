// Este archivo contiene la lista de todas las operaciones definidas en el /controller/petsController.js

const express = require('express');
const router = express.Router();

const { getAllPets, getPetById, postPet, putPet, deletePet } = require('../controller/petController.js');
const { validatePetId, validateAddPet, validateUpdatePet } = require('../validators/pet.js');

// Rutas
router.get('/', getAllPets);
router.get('/:id_pet', validatePetId, getPetById);
router.post('/', validateAddPet, postPet);
router.put('/:id_pet', validateUpdatePet, putPet);
router.delete('/:id_pet', validatePetId, deletePet);

module.exports = router;