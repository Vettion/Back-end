// Este archivo contiene la lista de todas las operaciones definidas en el /controller/roomController.js

const express = require('express');
const router = express.Router();

const { getAllRooms, getRoomByCodeRoom, getRoomDayInfo } = require('../controller/roomController.js');
const { validateRoomCode } = require('../validators/room.js');

// Rutas
router.get('/', getAllRooms);
// Información del día para una sala concreta (citas + limpieza)
router.get('/:code_room/day', validateRoomCode, getRoomDayInfo);
router.get('/:code_room', validateRoomCode, getRoomByCodeRoom);

module.exports = router;
