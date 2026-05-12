// Este archivo contiene la lista de todas las operaciones definidas en el /controller/roomController.js

const express = require('express');
const router = express.Router();

const { getAllRooms, getRoomByCodeRoom } = require('../controller/roomController.js');
const { validateRoomCode } = require('../validators/room.js');

// Rutas
router.get('/', getAllRooms);
router.get('/:code_room', validateRoomCode, getRoomByCodeRoom);

module.exports = router;
