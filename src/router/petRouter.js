// Este archivo contiene la lista de todas las operaciones definidas en el /controller/petsController.js

const express = require('express');
const router = express.Router();

const { getAllPets, getPetById, postPet, putPet } = require('../controller/petController.js');
const { validatePetId, validateAddPet, validateUpdatePet } = require('../validators/pet.js');

// Rutas
router.get('/', getAllPets);
router.get('/:id', validatePetId, getPetById);
router.post('/', validateAddPet, postPet)
router.put('/:id', validateUpdatePet, putPet)

module.exports = router;