const express = require('express');
const router = express.Router();

const { getAllAllergies, getAllergyById, postAllergy } = require('../controller/allergyController.js');

//Rutas para la gestion de alergias
router.get('/', getAllAllergies);
router.get('/:id_allergy', getAllergyById);
router.post('/', postAllergy);

module.exports = router;