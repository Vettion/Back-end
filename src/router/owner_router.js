const express = require('express');
const router = express.Router();

const {getOwners, getOwner} = require('../controller/owner_controller.js');

router.get('/vettion/owners', getOwners);
router.get('/vettion/owners/:dni', getOwner);

module.exports = router;