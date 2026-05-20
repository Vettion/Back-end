const express = require('express');
const router = express.Router();

const {getAllOwners, getOwnerByDni, postOwner, putOwner, deleteOwner} = require('../controller/ownerController.js');
const {validateOwnerId, validateAddOwner, validateUpdateOwner} = require('../validators/owner.js');

// Rutas para la gestion de dueños
router.get('/', getAllOwners);
router.get('/:dni_owner', validateOwnerId, getOwnerByDni);
router.post('/', validateAddOwner, postOwner);
router.put('/:dni_owner', validateUpdateOwner, putOwner);
router.delete('/:dni_owner', validateOwnerId, deleteOwner);

module.exports = router;