const express = require('express');
const router = express.Router();

const { getAllCleaners } = require('../controller/cleanerController.js');

// Ruta para obtener todo el personal de limpieza
router.get('/', getAllCleaners);

module.exports = router;
