// Este archivo contiene la lista de todas las operaciones definidas en el /controller/roomController.js

const express = require('express');
const router = express.Router();

const { getAllRooms } = require('../controller/roomController.js');
const { validateRoomId } = require('../validators/room.js');

// Rutas
router.get('/', getAllRooms);

module.exports = router;