// Este archivo contiene la lista de todas las operaciones definidas en el /controller/ownerController.js

const express = require('express');
const router = express.Router();

const { getOwners, getOwner, postOwner, putOwner, deleteOwner } = require('../controller/ownerController.js');
const { validateOwnerId, validateAddOwner, validateUpdateOwner } = require('../validators/owner.js')

// Rutas para la gestion de dueños
router.get('/vettion/owners', getOwners);
router.get('/vettion/owners/:dni_owner', validateOwnerId, getOwner);
router.post('/vettion/owners', validateAddOwner, postOwner);
router.put('/vettion/owners/:dni_owner', validateUpdateOwner, putOwner);
router.delete('/vettion/owners/:dni_owner', validateOwnerId, deleteOwner);

module.exports = router;