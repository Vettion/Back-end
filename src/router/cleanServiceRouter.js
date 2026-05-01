const express = require('express');
const router = express.Router();

const { getAllCleanServices, getCleanServiceById, putCleanService } = require('../controller/appointmentController.js');

router.get('/', getAllCleanServices);
router.get('/:id_clean_service', getCleanServiceById);
router.put('/:id_clean_service', putCleanService);

module.exports = router;