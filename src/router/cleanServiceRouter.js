const express = require('express');
const router = express.Router();

const { getAllCleanServices, getCleanServiceById, putCleanService } = require('../controller/appointmentController.js');
const { validateCleanServiceId, validateUpdateCleanService } = require('../validators/cleanService.js');

router.get('/', getAllCleanServices);
router.get('/:id_clean_service', validateCleanServiceId, getCleanServiceById);
router.put('/:id_clean_service', validateCleanServiceId, validateUpdateCleanService, putCleanService);

module.exports = router;