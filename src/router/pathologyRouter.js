const express = require('express');
const router = express.Router();

const { getAllPathologies, getPathologyById, getPathologyByPetId, postPathology, putPathology, deletePathology } = require('../controller/pathologyController.js');
const { validatePathologyId, validatePathologyPetId, validateAddPathology, validateUpdatePathology } = require('../validators/pathology.js');

//Rutas para la gestion de alergias
router.get('/', getAllPathologies);
router.get('/:id_pathology', validatePathologyId, getPathologyById);
router.get('/pet/:pet_id', validatePathologyPetId, getPathologyByPetId);
router.post('/', validateAddPathology, postPathology);
router.put('/:id_pathology', validateUpdatePathology, putPathology);
router.delete('/:id_pathology', validatePathologyId, deletePathology);

module.exports = router;