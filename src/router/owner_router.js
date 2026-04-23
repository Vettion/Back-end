const express = require('express');
const router = express.Router();

const {getOwners, getOwner, postOwner} = require('../controller/owner_controller.js');

router.get('/vettion/owners', getOwners);
router.get('/vettion/owners/:dni', getOwner);
router.post('/vettion/owners', postOwner);

module.exports = router;