const express = require('express');
const router = express.Router();

const {getOwners, getOwner, postOwner, putOwner, deleteOwner} = require('../controller/ownerController.js');

router.get('/vettion/owners', getOwners);
router.get('/vettion/owners/:dni', getOwner);
router.post('/vettion/owners', postOwner);
router.put('/vettion/owners/:dni', putOwner);
router.delete('/vettion/owners/:dni', deleteOwner);

module.exports = router;