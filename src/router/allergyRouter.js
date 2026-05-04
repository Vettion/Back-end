const express = require('express');
const router = express.Router();

const { getAllAllergies, getAllergyById, postAllergy, putAllergy, deleteAllergy } = require('../controller/allergyController.js');
const { validateAllergyId, validateAddAllergy, validateUpdateAllergy } = require('../validators/allergy.js');

//Rutas para la gestion de alergias
router.get('/', getAllAllergies);
router.get('/:id_allergy', validateAllergyId, getAllergyById);
router.post('/', validateAddAllergy, postAllergy);
router.put('/:id_allergy', validateUpdateAllergy, putAllergy);
router.delete('/:id_allergy', validateAllergyId, deleteAllergy);

module.exports = router;