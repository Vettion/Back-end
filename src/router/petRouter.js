// Este archivo contiene la lista de todas las operaciones definidas en el /controller/petsController.js

const express = require('express');
const router = express.Router();

const { getAllPets, getPetById } = require('../controller/petController.js');
const { validatePetId } = require('../validators/pet.js')

// Rutas
router.get('/', getAllPets);
router.get('/:id', validatePetId, getPetById);

module.exports = router;