const express = require('express');
const router = express.Router();

const { getAllAllergies, getAllergyById, postAllergy, putAllergy, deleteAllergy } = require('../controller/allergyController.js');

//Rutas para la gestion de alergias
router.get('/', getAllAllergies);
router.get('/:id_allergy', getAllergyById);
router.post('/', postAllergy);
router.put('/:id_allergy', putAllergy);
router.delete('/:id_allergy', deleteAllergy);

module.exports = router;