const express = require('express');
const router = express.Router();

const { getAllCleaners } = require('../controller/cleanerController.js');

// Rutas
router.get('/', getAllCleaners);

module.exports = router;
