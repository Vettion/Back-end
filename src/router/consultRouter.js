// Este archivo contiene la lista de todas las operaciones definidas en el /controller/consultController.js

const express = require('express');
const router = express.Router();

const { getAllConsults } = require('../controller/consultController.js');

// Rutas
router.get('/', getAllConsults);

module.exports = router; 