const express = require('express');
const router = express.Router();

const { getAllVeterinarians } = require('../controller/veterinarianController.js');

// Rutas
router.get('/', getAllVeterinarians);

module.exports = router;
