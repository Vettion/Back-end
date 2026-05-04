const express = require('express');
const router = express.Router();

const { getAllAllergies, getAllergyById } = require('../controller/allergyController.js');

//Rutas para la gestion de alergias
router.get('/', getAllAllergies);
router.get('/:id_allergy', getAllergyById);

module.exports = router;