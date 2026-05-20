// Este archivo contiene la lista de todas las operaciones definidas en el /controller/serviceController.js

const express = require('express');
const router = express.Router();

const { getAllServices, getServiceById } = require('../controller/serviceController.js');
const { validateServiceId } = require('../validators/service.js'); 

// Rutas
router.get('/', getAllServices);
router.get('/:id_service', validateServiceId, getServiceById);

module.exports = router; 