// Este archivo contiene la lista de todas las operaciones definidas en el /controller/petsController.js

const express = require('express');
const router = express.Router();

const { getAllPets, getPetById, postPet, putPet, deletePet } = require('../controller/petController.js');
const { validatePetId, validateAddPet, validateUpdatePet } = require('../validators/pet.js');

// Rutas
router.get('/vettion/pets', getAllPets);
router.get('/vettion/pets/:id', validatePetId, getPetById);
router.post('/vettion/pets', validateAddPet, postPet);
router.put('/vettion/pets/:id', validateUpdatePet, putPet);
router.delete('/vettion/pets/:id', validatePetId, deletePet);

module.exports = router;