const express = require('express');
const router = express.Router();

const {getOwners, getOwner, postOwner, putOwner, deleteOwner} = require('../controller/ownerController.js');

// Rutas para la gestion de dueños
router.get('/vettion/owners', getOwners);
router.get('/vettion/owners/:dni_owner', getOwner);
router.post('/vettion/owners', postOwner);
router.put('/vettion/owners/:dni_owner', putOwner);
router.delete('/vettion/owners/:dni_owner', deleteOwner);

module.exports = router;