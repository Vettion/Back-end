// Este archivo contiene la lista de todas las operaciones definidas en el /controller/consultController.js

const express = require('express');
const router = express.Router();

const { getAllConsults, getConsultById } = require('../controller/consultController.js');
const { validateConsultId } = require('../validators/consult.js'); 

// Rutas
router.get('/', getAllConsults);
router.get('/:id', validateConsultId, getConsultById);

module.exports = router; 