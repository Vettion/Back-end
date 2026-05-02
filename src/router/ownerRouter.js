const express = require('express');
const router = express.Router();

const {getOwners, getOwner, postOwner, putOwner, deleteOwner} = require('../controller/ownerController.js');
const {validateOwnerId, validateAddOwner, validateUpdateOwner} = require('../validators/owner.js');

// Rutas para la gestion de dueños
router.get('/', getOwners);
router.get('/:dni_owner', validateOwnerId, getOwner);
router.post('/', validateAddOwner, postOwner);
router.put('/:dni_owner', validateUpdateOwner, putOwner);
router.delete('/:dni_owner', validateOwnerId, deleteOwner);

module.exports = router;